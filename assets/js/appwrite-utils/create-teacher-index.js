const { Client, Databases } = require('node-appwrite');

// Config
const ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = '696446d40034324177b2';
const API_KEY = 'standard_f14a90ae183812bfa612144a2291e1b60e67474ce6437ead7117408d0e8a1b4dc922400d0c76b861ecb3845c822b1d4b9c23e0d02616697e7eeb3917fd45cb3b6d883295f8b31f0204b80c0f98eb5065b43d6e4c1eb9419fa17df5be4042996e40904cfb71e00326a3525859b33073fa685d67dc562d84e37bca14c380c24900'; // Using the key from previous context
const DATABASE_ID = 'BouslaDB';
const COLLECTION_ID = 'applicants';

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

async function createIndex() {
    console.log('Checking indexes for applicants collection...');

    try {
        const settings = await databases.listIndexes(DATABASE_ID, COLLECTION_ID);
        const exists = settings.indexes.some(idx => idx.key === 'teacherId');

        if (exists) {
            console.log('✅ Index for teacherId already exists.');
        } else {
            console.log('Creating index for teacherId...');
            await databases.createIndex(
                DATABASE_ID,
                COLLECTION_ID,
                'idx_teacher',
                'key',
                ['teacherId'],
                ['ASC']
            );
            console.log('✅ Index created successfully!');
        }
    } catch (error) {
        console.error('❌ Error managing indexes:', error.message);
    }
}

createIndex();
