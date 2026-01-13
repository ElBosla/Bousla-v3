/**
 * Appwrite Database Setup Script
 * This script creates all required collections and attributes for the Bousla project
 * 
 * Prerequisites:
 * 1. Install Appwrite Node SDK: npm install node-appwrite
 * 2. Create an API Key in Appwrite Console with Database permissions
 * 3. Update the API_KEY below
 * 
 * Usage: node setup-appwrite.js
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

// Collection definitions
const collections = [
    {
        id: 'applicants',
        name: 'Applicants',
        permissions: ['read("any")', 'create("any")', 'update("any")', 'delete("any")'],
        attributes: [
            { key: 'name', type: 'string', size: 255, required: true },
            { key: 'phone', type: 'string', size: 50, required: true },
            { key: 'email', type: 'string', size: 255, required: false },
            { key: 'specialization', type: 'string', size: 255, required: true },
            { key: 'plan', type: 'string', size: 100, required: true },
            { key: 'status', type: 'string', size: 50, required: true, default: 'pending' },
            { key: 'paymentStatus', type: 'string', size: 50, required: false, default: 'unpaid' },
            { key: 'timestamp', type: 'datetime', required: true },
            { key: 'notes', type: 'string', size: 5000, required: false },
            { key: 'teacherId', type: 'string', size: 255, required: false },
            { key: 'teacherName', type: 'string', size: 255, required: false },
            { key: 'password', type: 'string', size: 255, required: false }
        ]
    },
    {
        id: 'page_visits',
        name: 'Page Visits',
        permissions: ['read("any")', 'create("any")', 'update("any")', 'delete("any")'],
        attributes: [
            { key: 'device', type: 'string', size: 50, required: false },
            { key: 'userAgent', type: 'string', size: 500, required: false },
            { key: 'referrerSource', type: 'string', size: 255, required: false },
            { key: 'location', type: 'string', size: 255, required: false },
            { key: 'duration', type: 'integer', required: false, default: 0 },
            { key: 'maxScroll', type: 'integer', required: false, default: 0 },
            { key: 'timestamp', type: 'datetime', required: true },
            { key: 'events', type: 'string', size: 10000, required: false },
            { key: 'viewedSections', type: 'string', size: 5000, required: false },
            { key: 'os', type: 'string', size: 100, required: false }
        ]
    },
    {
        id: 'admins',
        name: 'Admins',
        permissions: ['read("any")', 'create("any")', 'update("any")', 'delete("any")'],
        attributes: [
            { key: 'username', type: 'string', size: 100, required: true },
            { key: 'password', type: 'string', size: 255, required: true },
            { key: 'role', type: 'string', size: 50, required: true, default: 'admin' },
            { key: 'name', type: 'string', size: 255, required: false },
            { key: 'subject', type: 'string', size: 255, required: false },
            { key: 'phone', type: 'string', size: 50, required: false },
            { key: 'image', type: 'string', size: 500, required: false },
            { key: 'bio', type: 'string', size: 2000, required: false },
            { key: 'createdAt', type: 'datetime', required: false },
            { key: 'updatedAt', type: 'datetime', required: false }
        ]
    },
    {
        id: 'messages',
        name: 'Messages',
        permissions: ['read("any")', 'create("any")', 'update("any")', 'delete("any")'],
        attributes: [
            { key: 'senderId', type: 'string', size: 255, required: true },
            { key: 'senderType', type: 'string', size: 50, required: true },
            { key: 'text', type: 'string', size: 5000, required: false },
            { key: 'type', type: 'string', size: 50, required: true, default: 'text' },
            { key: 'audioUrl', type: 'string', size: 500, required: false },
            { key: 'fileUrl', type: 'string', size: 500, required: false },
            { key: 'fileName', type: 'string', size: 255, required: false },
            { key: 'fileType', type: 'string', size: 100, required: false },
            { key: 'fileId', type: 'string', size: 255, required: false },
            { key: 'meetingUrl', type: 'string', size: 500, required: false },
            { key: 'timestamp', type: 'datetime', required: true }
        ]
    },
    {
        id: 'calendar_content',
        name: 'Calendar Content',
        permissions: ['read("any")', 'create("any")', 'update("any")', 'delete("any")'],
        attributes: [
            { key: 'date', type: 'string', size: 50, required: true },
            { key: 'notes', type: 'string', size: 5000, required: false },
            { key: 'images', type: 'string', size: 10000, required: false },
            { key: 'platforms', type: 'string', size: 1000, required: false },
            { key: 'publishTime', type: 'string', size: 50, required: false },
            { key: 'dayTasks', type: 'string', size: 10000, required: false },
            { key: 'status', type: 'string', size: 50, required: false, default: 'draft' },
            { key: 'updatedAt', type: 'datetime', required: false }
        ]
    },
    {
        id: 'global_tasks',
        name: 'Global Tasks',
        permissions: ['read("any")', 'create("any")', 'update("any")', 'delete("any")'],
        attributes: [
            { key: 'text', type: 'string', size: 1000, required: true },
            { key: 'done', type: 'boolean', required: true, default: false },
            { key: 'createdAt', type: 'datetime', required: true }
        ]
    },
    {
        id: 'transactions',
        name: 'Transactions',
        permissions: ['read("any")', 'create("any")', 'update("any")', 'delete("any")'],
        attributes: [
            { key: 'amount', type: 'double', required: true },
            { key: 'type', type: 'string', size: 50, required: true },
            { key: 'category', type: 'string', size: 100, required: true },
            { key: 'note', type: 'string', size: 1000, required: false },
            { key: 'date', type: 'datetime', required: true }
        ]
    },
    {
        id: 'finance_todos',
        name: 'Finance Todos',
        permissions: ['read("any")', 'create("any")', 'update("any")', 'delete("any")'],
        attributes: [
            { key: 'text', type: 'string', size: 1000, required: true },
            { key: 'completed', type: 'boolean', required: true, default: false },
            { key: 'timestamp', type: 'datetime', required: true }
        ]
    }
];

// Helper function to create a collection
async function createCollection(collectionData) {
    try {
        console.log(`\n📦 Creating collection: ${collectionData.name}...`);

        const collection = await databases.createCollection(
            DATABASE_ID,
            collectionData.id,
            collectionData.name,
            collectionData.permissions
        );

        console.log(`✅ Collection "${collectionData.name}" created successfully!`);

        // Create attributes
        for (const attr of collectionData.attributes) {
            try {
                console.log(`  ➕ Adding attribute: ${attr.key} (${attr.type})`);

                if (attr.type === 'string') {
                    await databases.createStringAttribute(
                        DATABASE_ID,
                        collectionData.id,
                        attr.key,
                        attr.size,
                        attr.required,
                        attr.default || null
                    );
                } else if (attr.type === 'integer') {
                    await databases.createIntegerAttribute(
                        DATABASE_ID,
                        collectionData.id,
                        attr.key,
                        attr.required,
                        null,
                        null,
                        attr.default || null
                    );
                } else if (attr.type === 'double') {
                    await databases.createFloatAttribute(
                        DATABASE_ID,
                        collectionData.id,
                        attr.key,
                        attr.required,
                        null,
                        null,
                        attr.default || null
                    );
                } else if (attr.type === 'boolean') {
                    await databases.createBooleanAttribute(
                        DATABASE_ID,
                        collectionData.id,
                        attr.key,
                        attr.required,
                        attr.default || null
                    );
                } else if (attr.type === 'datetime') {
                    await databases.createDatetimeAttribute(
                        DATABASE_ID,
                        collectionData.id,
                        attr.key,
                        attr.required,
                        attr.default || null
                    );
                }

                // Wait a bit to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 500));

            } catch (attrError) {
                console.error(`  ❌ Error creating attribute ${attr.key}:`, attrError.message);
            }
        }

        console.log(`✅ All attributes for "${collectionData.name}" created!`);

    } catch (error) {
        if (error.code === 409) {
            console.log(`⚠️  Collection "${collectionData.name}" already exists, skipping...`);
        } else {
            console.error(`❌ Error creating collection "${collectionData.name}":`, error.message);
        }
    }
}

// Main execution
async function setupDatabase() {
    console.log('🚀 Starting Appwrite Database Setup...\n');
    console.log(`📊 Database ID: ${DATABASE_ID}`);
    console.log(`📦 Collections to create: ${collections.length}\n`);

    for (const collection of collections) {
        await createCollection(collection);
        // Wait between collections to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n✨ Database setup completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Create Storage Buckets:');
    console.log('   - chats (for chat files and audio)');
    console.log('   - calendar (for calendar images)');
    console.log('2. Configure bucket permissions in Appwrite Console');
    console.log('3. Test your application!\n');
}

// Run the setup
setupDatabase().catch(console.error);
