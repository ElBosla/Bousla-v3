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

async function fixFullNameAttribute() {
    console.log('🔧 جاري إصلاح عمود fullName...\n');

    try {
        // 1. حذف العمود القديم
        console.log('⏳ حذف العمود القديم (fullName)...');
        await databases.deleteAttribute(DATABASE_ID, COLLECTION_ID, 'fullName');
        console.log('✅ تم الحذف');

        // 2. الانتظار قليلاً للتأكد من اكتمال الحذف
        console.log('⏳ انتظار 3 ثوانٍ...');
        await new Promise(r => setTimeout(r, 3000));

        // 3. إنشاء العمود الجديد بالحجم الصحيح
        console.log('⏳ إنشاء العمود الجديد بحجم 128 حرف...');
        await databases.createStringAttribute(
            DATABASE_ID,
            COLLECTION_ID,
            'fullName',
            128,  // الحجم الصحيح
            true  // required
        );
        console.log('✅ تم الإنشاء بنجاح');

        console.log('\n🎉 تم إصلاح المشكلة! يمكنك الآن تجربة إرسال النموذج.');

    } catch (error) {
        console.error('❌ حدث خطأ:', error.message);
        console.log('\n⚠️ إذا استمرت المشكلة، قم بالتالي يدوياً:');
        console.log('   1. افتح Appwrite Console > trainees collection');
        console.log('   2. اذهب إلى Attributes');
        console.log('   3. احذف العمود "fullName"');
        console.log('   4. أنشئ عمود جديد: fullName (String, Size: 128, Required)');
    }
}

fixFullNameAttribute();
