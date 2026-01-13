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

// التعريف الصحيح لجميع الأعمدة المطلوبة
const EXPECTED_ATTRIBUTES = {
    'fullName': { type: 'string', size: 128, required: true },
    'email': { type: 'email', required: true },
    'mobile': { type: 'string', size: 20, required: false },
    'track': { type: 'string', size: 64, required: true },
    'level': { type: 'string', size: 64, required: true },
    'package': { type: 'string', size: 64, required: true },
    'status': { type: 'string', size: 32, required: true },
    'githubLink': { type: 'url', required: true },
    'cvLink': { type: 'url', required: false },
    'reason': { type: 'string', size: 2000, required: true },
    'appliedAt': { type: 'datetime', required: true }
};

async function checkAllAttributes() {
    console.log('🔍 جاري فحص جميع الأعمدة في Collection "trainees"...\n');

    try {
        // جلب معلومات الـ Collection
        const collection = await databases.getCollection(DATABASE_ID, COLLECTION_ID);
        const existingAttributes = collection.attributes;

        console.log(`📊 عدد الأعمدة الموجودة: ${existingAttributes.length}\n`);

        const issues = [];
        const missing = [];

        // فحص كل عمود متوقع
        for (const [key, expected] of Object.entries(EXPECTED_ATTRIBUTES)) {
            const existing = existingAttributes.find(attr => attr.key === key);

            if (!existing) {
                missing.push(key);
                console.log(`❌ ${key}: غير موجود`);
                continue;
            }

            let hasIssue = false;
            let issueDetails = [];

            // فحص النوع
            if (existing.type !== expected.type) {
                hasIssue = true;
                issueDetails.push(`النوع خاطئ (موجود: ${existing.type}, مطلوب: ${expected.type})`);
            }

            // فحص الحجم للأعمدة النصية
            if (expected.size && existing.size !== expected.size) {
                hasIssue = true;
                issueDetails.push(`الحجم خاطئ (موجود: ${existing.size}, مطلوب: ${expected.size})`);
            }

            // فحص Required
            if (existing.required !== expected.required) {
                hasIssue = true;
                issueDetails.push(`Required خاطئ (موجود: ${existing.required}, مطلوب: ${expected.required})`);
            }

            if (hasIssue) {
                issues.push({ key, details: issueDetails });
                console.log(`⚠️  ${key}: ${issueDetails.join(', ')}`);
            } else {
                console.log(`✅ ${key}: صحيح (${expected.type}${expected.size ? `, ${expected.size}` : ''}, required: ${expected.required})`);
            }
        }

        // فحص الأعمدة الزائدة
        const extraAttributes = existingAttributes.filter(
            attr => !EXPECTED_ATTRIBUTES[attr.key]
        );

        if (extraAttributes.length > 0) {
            console.log('\n⚠️  أعمدة إضافية غير متوقعة:');
            extraAttributes.forEach(attr => {
                console.log(`   - ${attr.key} (${attr.type})`);
            });
        }

        // ملخص النتائج
        console.log('\n' + '='.repeat(60));
        console.log('📋 ملخص الفحص:');
        console.log('='.repeat(60));

        if (missing.length === 0 && issues.length === 0) {
            console.log('✅ جميع الأعمدة صحيحة ومطابقة للمواصفات!');
        } else {
            if (missing.length > 0) {
                console.log(`\n❌ أعمدة مفقودة (${missing.length}):`);
                missing.forEach(key => console.log(`   - ${key}`));
            }

            if (issues.length > 0) {
                console.log(`\n⚠️  أعمدة بها مشاكل (${issues.length}):`);
                issues.forEach(issue => {
                    console.log(`   - ${issue.key}: ${issue.details.join(', ')}`);
                });
            }

            console.log('\n💡 لإصلاح المشاكل:');
            console.log('   1. احذف الأعمدة الخاطئة من Appwrite Console');
            console.log('   2. شغّل السكربت: node setup_trainees_schema.js');
        }

    } catch (error) {
        console.error('❌ حدث خطأ أثناء الفحص:', error.message);
    }
}

checkAllAttributes();
