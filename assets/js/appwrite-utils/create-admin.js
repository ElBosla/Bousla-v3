/**
 * Create Default Admin User
 * This script creates a default admin user for initial login
 * 
 * Usage: node create-admin.js
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
const COLLECTION_ID = 'admins';

async function createDefaultAdmin() {
    console.log('🔐 Creating default admin user...\n');

    try {
        // Create default admin
        const admin = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            sdk.ID.unique(),
            {
                username: 'admin',
                password: 'admin123',
                name: 'المسؤول الرئيسي',
                createdAt: new Date().toISOString()
            },
            ['read("any")', 'update("any")', 'delete("any")']
        );

        console.log('✅ Default admin user created successfully!\n');
        console.log('📋 Login credentials:');
        console.log('   Username: admin');
        console.log('   Password: admin123\n');
        console.log('⚠️  IMPORTANT: Please change this password after first login!\n');

    } catch (error) {
        if (error.code === 409) {
            console.log('⚠️  Admin user already exists!\n');
            console.log('📋 Try logging in with:');
            console.log('   Username: admin');
            console.log('   Password: admin123\n');
        } else {
            console.error('❌ Error creating admin:', error.message);
        }
    }
}

createDefaultAdmin();
