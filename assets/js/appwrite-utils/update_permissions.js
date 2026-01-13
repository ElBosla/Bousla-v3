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

async function updatePermissions() {
    console.log('🔐 جاري تحديث صلاحيات Collection "trainees"...\n');

    try {
        await databases.updateCollection(
            DATABASE_ID,
            COLLECTION_ID,
            COLLECTION_ID, // name
            [
                sdk.Permission.create(sdk.Role.any()),      // أي شخص يمكنه التقديم
                sdk.Permission.read(sdk.Role.any()),        // أي شخص يمكنه القراءة (للأدمن)
                sdk.Permission.update(sdk.Role.any()),      // أي شخص يمكنه التحديث (للأدمن)
                sdk.Permission.delete(sdk.Role.any())       // أي شخص يمكنه الحذف (للأدمن)
            ],
            false, // documentSecurity (استخدام صلاحيات Collection)
            true   // enabled
        );

        console.log('✅ تم تحديث الصلاحيات بنجاح!');
        console.log('\n📋 الصلاحيات الحالية:');
        console.log('   - Create: Any (أي شخص)');
        console.log('   - Read: Any (أي شخص)');
        console.log('   - Update: Any (أي شخص - للأدمن)');
        console.log('   - Delete: Any (أي شخص - للأدمن)');
        console.log('\n💡 الآن يمكن للأدمن إدارة البيانات بالكامل.');

    } catch (error) {
        console.error('❌ فشل التحديث:', error.message);
        console.log('\n⚠️ قم بالتحديث يدوياً:');
        console.log('   1. افتح Appwrite Console > trainees');
        console.log('   2. Settings > Permissions');
        console.log('   3. أضف: Users - Read, Update, Delete');
    }
}

updatePermissions();
