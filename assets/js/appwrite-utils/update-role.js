/**
 * Update Admin User with Role
 * This script updates an existing admin user to add the role attribute
 * 
 * Usage: node update-admin-role.js
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
const USER_ID = '696451390037ca911ea3';

async function updateAdminRole() {
    console.log('🔧 Updating admin user with role...\n');

    try {
        // First, let's check if role attribute exists
        const collection = await databases.getCollection(DATABASE_ID, COLLECTION_ID);
        const hasRoleAttribute = collection.attributes.some(attr => attr.key === 'role');

        if (!hasRoleAttribute) {
            console.log('⚠️  Role attribute does not exist yet.');
            console.log('📝 Creating role attribute...\n');

            try {
                await databases.createStringAttribute(
                    DATABASE_ID,
                    COLLECTION_ID,
                    'role',
                    50,
                    false, // Not required to avoid issues
                    'admin' // Default value
                );
                console.log('✅ Role attribute created!\n');

                // Wait a bit for the attribute to be ready
                console.log('⏳ Waiting for attribute to be ready...');
                await new Promise(resolve => setTimeout(resolve, 3000));
            } catch (attrError) {
                console.error('❌ Error creating role attribute:', attrError.message);
                return;
            }
        }

        // Update the user with role
        const updatedUser = await databases.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            USER_ID,
            {
                role: 'admin'
            }
        );

        console.log('✅ Admin user updated successfully!\n');
        console.log('📋 User details:');
        console.log('   ID:', updatedUser.$id);
        console.log('   Username:', updatedUser.username);
        console.log('   Role:', updatedUser.role);
        console.log('   Name:', updatedUser.name || 'N/A');
        console.log('\n✨ You can now login with this user!\n');

    } catch (error) {
        console.error('❌ Error updating admin:', error.message);
        console.log('\n💡 Tip: Make sure the user ID is correct and the role attribute exists.');
    }
}

updateAdminRole();
