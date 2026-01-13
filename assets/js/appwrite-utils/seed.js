/**
 * Seed Data Script
 * This script populates the database with dummy data for testing
 * 
 * Usage: node seed-data.js
 */

const sdk = require('node-appwrite');

// Configuration
const client = new sdk.Client();
const databases = new sdk.Databases(client);

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('696446d40034324177b2')
    .setKey('standard_f14a90ae183812bfa612144a2291e1b60e67474ce6437ead7117408d0e8a1b4dc922400d0c76b861ecb3845c822b1d4b9c23e0d02616697e7eeb3917fd45cb3b6d883295f8b31f0204b80c0f98eb5065b43d6e4c1eb9419fa17df5be4042996e40904cfb71e00326a3525859b33073fa685d67dc562d84e37bca14c380c24900');

const DATABASE_ID = 'BouslaDB';

async function seedData() {
    console.log('🌱 Seeding database with dummy data...\n');

    try {
        // 1. Add Applicants
        console.log('Adding Applicants...');
        for (let i = 1; i <= 5; i++) {
            await databases.createDocument(DATABASE_ID, 'applicants', sdk.ID.unique(), {
                name: `طالب تجريبي ${i}`,
                phone: `0101234567${i}`,
                email: `student${i}@example.com`,
                specialization: 'Web Development',
                plan: i % 2 === 0 ? 'محترف (150 ج.م)' : 'البداية (50 ج.م)',
                status: i === 1 ? 'نشط' : 'قيد المراجعة',
                paymentStatus: i === 1 ? 'paid' : 'unpaid',
                timestamp: new Date().toISOString(),
                notes: 'ملاحظة تجريبية'
            });
        }

        // 2. Add Page Visits
        console.log('Adding Page Visits...');
        for (let i = 0; i < 10; i++) {
            await databases.createDocument(DATABASE_ID, 'page_visits', sdk.ID.unique(), {
                timestamp: new Date().toISOString(),
                device: 'Desktop',
                location: 'Cairo, Egypt'
            });
        }

        // 3. Add Global Tasks
        console.log('Adding Global Tasks...');
        await databases.createDocument(DATABASE_ID, 'global_tasks', sdk.ID.unique(), {
            text: 'مراجعة المتقدمين الجدد',
            done: false,
            createdAt: new Date().toISOString()
        });

        // 4. Add Transaction
        console.log('Adding Transactions...');
        await databases.createDocument(DATABASE_ID, 'transactions', sdk.ID.unique(), {
            amount: 500.0,
            type: 'income',
            category: 'اشتراكات طلاب',
            note: 'اشتراك جديد',
            date: new Date().toISOString()
        });

        console.log('\n✅ Database seeded successfully!');

    } catch (error) {
        console.error('❌ Error seeding data:', error.message);
    }
}

seedData();
