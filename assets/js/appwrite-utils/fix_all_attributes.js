const sdk = require('node-appwrite');

const client = new sdk.Client();
const databases = new sdk.Databases(client);

const API_KEY = 'standard_3781e1c18e055938a41130fd198c211b34d5791f74ce44ff71c344e0f9019d28a2d16667d6c187825fc2bae7b492710851632bdd2e620c0f0e5945e2d3df0e757cba1f13d1210fb8660c14606c8cf5528676719aa6af7d546dc17c0fb8e9b6e1e1d784c4d392434ce1fdb2f9811278134186e621be8997968ca261939084ea87';

const PROJECT_ID = '696446d40034324177b2';
const DATABASE_ID = 'BouslaDB';
const COLLECTION_ID = 'trainees';

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

// الأعمدة التي تحتاج إعادة إنشاء
const ATTRIBUTES_TO_FIX = [
    'email',
    'mobile',
    'level',
    'package',
    'status',
    'githubLink',
    'cvLink',
    'reason'
];

async function deleteAndRecreate() {
    console.log('🔧 جاري إصلاح جميع الأعمدة الخاطئة...\n');

    // الخطوة 1: حذف الأعمدة الخاطئة
    console.log('📝 المرحلة 1: حذف الأعمدة الخاطئة\n');
    for (const key of ATTRIBUTES_TO_FIX) {
        try {
            process.stdout.write(`⏳ حذف ${key}... `);
            await databases.deleteAttribute(DATABASE_ID, COLLECTION_ID, key);
            console.log('✅');
            await new Promise(r => setTimeout(r, 500));
        } catch (error) {
            console.log(`⚠️ (${error.message})`);
        }
    }

    console.log('\n⏳ انتظار 5 ثوانٍ للتأكد من اكتمال الحذف...\n');
    await new Promise(r => setTimeout(r, 5000));

    // الخطوة 2: إعادة إنشاء الأعمدة بالإعدادات الصحيحة
    console.log('📝 المرحلة 2: إعادة إنشاء الأعمدة بالإعدادات الصحيحة\n');

    const attributes = [
        { type: 'email', key: 'email', required: true },
        { type: 'string', key: 'mobile', size: 20, required: false },
        { type: 'string', key: 'level', size: 64, required: true },
        { type: 'string', key: 'package', size: 64, required: true },
        { type: 'string', key: 'status', size: 32, required: true },
        { type: 'url', key: 'githubLink', required: true },
        { type: 'url', key: 'cvLink', required: false },
        { type: 'string', key: 'reason', size: 2000, required: true }
    ];

    for (const attr of attributes) {
        try {
            process.stdout.write(`⏳ إنشاء ${attr.key}... `);

            if (attr.type === 'string') {
                await databases.createStringAttribute(
                    DATABASE_ID,
                    COLLECTION_ID,
                    attr.key,
                    attr.size,
                    attr.required
                );
            } else if (attr.type === 'email') {
                await databases.createEmailAttribute(
                    DATABASE_ID,
                    COLLECTION_ID,
                    attr.key,
                    attr.required
                );
            } else if (attr.type === 'url') {
                await databases.createUrlAttribute(
                    DATABASE_ID,
                    COLLECTION_ID,
                    attr.key,
                    attr.required
                );
            }

            console.log('✅');
            await new Promise(r => setTimeout(r, 1000));

        } catch (error) {
            console.log(`❌ (${error.message})`);
        }
    }

    console.log('\n🎉 تم الانتهاء من الإصلاح!');
    console.log('\n💡 للتحقق من النتيجة، شغّل: node check_attributes.js');
}

deleteAndRecreate();
