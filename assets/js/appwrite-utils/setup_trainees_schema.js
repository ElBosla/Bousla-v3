const sdk = require('node-appwrite');

// تهيئة العميل
const client = new sdk.Client();
const databases = new sdk.Databases(client);

// الإعدادات - يرجى وضع مفتاح الـ API الخاص بك هنا
// اذهب إلى Appwrite Console > Project > Settings > API Keys > Create API Key
// تأكد من منح صلاحيات: Database (Read/Write) + Collections (Read/Write) + Attributes (Read/Write)
const API_KEY = 'standard_3781e1c18e055938a41130fd198c211b34d5791f74ce44ff71c344e0f9019d28a2d16667d6c187825fc2bae7b492710851632bdd2e620c0f0e5945e2d3df0e757cba1f13d1210fb8660c14606c8cf5528676719aa6af7d546dc17c0fb8e9b6e1e1d784c4d392434ce1fdb2f9811278134186e621be8997968ca261939084ea87';

const PROJECT_ID = '696446d40034324177b2';
const DATABASE_ID = 'BouslaDB';
const COLLECTION_ID = 'trainees';

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

async function setupSchema() {
    console.log('🔄 جاري إنشاء هيكل قاعدة البيانات (Attributes)...');

    const attributes = [
        // الاسم - نص
        { type: 'string', key: 'fullName', size: 128, required: true },
        // البريد - ايميل
        { type: 'email', key: 'email', required: true },
        // الموبايل - نص (اختياري)
        { type: 'string', key: 'mobile', size: 20, required: false },
        // التراك - نص (وهو سبب المشكلة السابقة)
        { type: 'string', key: 'track', size: 64, required: true },
        // المستوى - نص
        { type: 'string', key: 'level', size: 64, required: true },
        // الباقة - نص
        { type: 'string', key: 'package', size: 64, required: true },
        // الحالة - نص (قيمة افتراضية Pending)
        { type: 'string', key: 'status', size: 32, required: true, default: 'Pending' },
        // روابط - URL
        { type: 'url', key: 'githubLink', required: true },
        { type: 'url', key: 'cvLink', required: false },
        // السبب - نص طويل
        { type: 'string', key: 'reason', size: 2000, required: true },
        // تاريخ التقديم - وقت وتاريخ
        { type: 'datetime', key: 'appliedAt', required: true }
    ];

    for (const attr of attributes) {
        try {
            process.stdout.write(`⏳ إنشاء العمود ${attr.key}... `);

            if (attr.type === 'string') {
                await databases.createStringAttribute(DATABASE_ID, COLLECTION_ID, attr.key, attr.size, attr.required, attr.default);
            } else if (attr.type === 'email') {
                await databases.createEmailAttribute(DATABASE_ID, COLLECTION_ID, attr.key, attr.required);
            } else if (attr.type === 'url') {
                await databases.createUrlAttribute(DATABASE_ID, COLLECTION_ID, attr.key, attr.required);
            } else if (attr.type === 'datetime') {
                await databases.createDatetimeAttribute(DATABASE_ID, COLLECTION_ID, attr.key, attr.required);
            }

            console.log('✅ تم');
            // انتظار بسيط لتجنب الضغط على السيرفر
            await new Promise(r => setTimeout(r, 1000));

        } catch (error) {
            if (error.code === 409) {
                console.log('⚠️ موجود بالفعل (تخطي)');
            } else {
                console.log('❌ فشل');
                console.error('   السبب:', error.message);
            }
        }
    }

    // إنشاء Index للترتيب حسب التاريخ
    try {
        process.stdout.write(`⏳ إنشاء Index للترتيب (appliedAt)... `);
        await databases.createIndex(DATABASE_ID, COLLECTION_ID, 'idx_appliedAt', 'key', ['appliedAt'], ['DESC']);
        console.log('✅ تم');
    } catch (error) {
        if (error.code === 409) {
            console.log('⚠️ موجود بالفعل');
        } else {
            console.error('❌ فشل:', error.message);
        }
    }

    console.log('\n🎉 تم الانتهاء! قاعدة البيانات جاهزة لاستقبال الطلبات.');

    // إعداد الصلاحيات للسماح لأي شخص بالتقديم
    await setupPermissions();
}

async function setupPermissions() {
    console.log('\n🔐 جاري إعداد الصلاحيات (Permissions)...');

    try {
        // السماح لأي شخص (any) بإنشاء مستندات جديدة
        // والسماح للمستخدمين بقراءة وتحديث وحذف مستنداتهم
        await databases.updateCollection(
            DATABASE_ID,
            COLLECTION_ID,
            COLLECTION_ID, // name (keep same)
            [
                sdk.Permission.create(sdk.Role.any()),
                sdk.Permission.read(sdk.Role.any()),
                sdk.Permission.update(sdk.Role.users()),
                sdk.Permission.delete(sdk.Role.users())
            ],
            false, // documentSecurity
            true   // enabled
        );
        console.log('✅ تم تفعيل الصلاحيات بنجاح - الآن يمكن لأي شخص التقديم!');
    } catch (error) {
        console.error('❌ فشل في تحديث الصلاحيات:', error.message);
        console.log('⚠️ يرجى تفعيل الصلاحيات يدوياً من لوحة التحكم:');
        console.log('   1. افتح Collection "trainees" في Appwrite Console');
        console.log('   2. اذهب إلى Settings > Permissions');
        console.log('   3. أضف Role: "Any" مع صلاحية "Create"');
    }
}

setupPermissions();
