/**
 * List All Admin Users
 * This script lists all users in the admins collection
 * 
 * Usage: node list-admins.js
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

async function listAdmins() {
    console.log('👥 Listing all admin users...\n');

    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

        if (response.documents.length === 0) {
            console.log('⚠️  No users found in the admins collection.\n');
            return;
        }

        console.log(`📊 Found ${response.documents.length} user(s):\n`);

        response.documents.forEach((user, index) => {
            console.log(`${index + 1}. User ID: ${user.$id}`);
            console.log(`   Username: ${user.username}`);
            console.log(`   Password: ${user.password}`);
            console.log(`   Role: ${user.role || 'Not set'}`);
            console.log(`   Name: ${user.name || 'N/A'}`);
            console.log(`   Created: ${user.createdAt || 'N/A'}`);
            console.log('');
        });

        console.log('✨ Done!\n');

    } catch (error) {
        console.error('❌ Error listing admins:', error.message);
    }
}

listAdmins();
