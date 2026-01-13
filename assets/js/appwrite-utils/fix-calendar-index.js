/**
 * Fix Calendar Index
 * Creates an index for the 'date' attribute in calendar_content to enable querying
 */

const sdk = require('node-appwrite');

const client = new sdk.Client();
const databases = new sdk.Databases(client);

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('696446d40034324177b2')
    .setKey('standard_f14a90ae183812bfa612144a2291e1b60e67474ce6437ead7117408d0e8a1b4dc922400d0c76b861ecb3845c822b1d4b9c23e0d02616697e7eeb3917fd45cb3b6d883295f8b31f0204b80c0f98eb5065b43d6e4c1eb9419fa17df5be4042996e40904cfb71e00326a3525859b33073fa685d67dc562d84e37bca14c380c24900');

const DATABASE_ID = 'BouslaDB';
const COLLECTION_ID = 'calendar_content';

async function createIndex() {
    console.log('🔧 Creating index for calendar_content...\n');

    try {
        await databases.createIndex(
            DATABASE_ID,
            COLLECTION_ID,
            'date_index',
            'key',
            ['date'],
            ['ASC']
        );
        console.log('✅ Index created successfully!');
        console.log('⏳ Note: Indexes may take a few minutes to become active.');
    } catch (error) {
        if (error.code === 409) {
            console.log('⚠️  Index already exists.');
        } else {
            console.error('❌ Error creating index:', error.message);
        }
    }
}

createIndex();
