/**
 * Add Missing Attributes for Applicants Form
 * Usage: node add-applicant-attributes.js
 */

const sdk = require('node-appwrite');

const client = new sdk.Client();
const databases = new sdk.Databases(client);

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('696446d40034324177b2')
    .setKey('standard_f14a90ae183812bfa612144a2291e1b60e67474ce6437ead7117408d0e8a1b4dc922400d0c76b861ecb3845c822b1d4b9c23e0d02616697e7eeb3917fd45cb3b6d883295f8b31f0204b80c0f98eb5065b43d6e4c1eb9419fa17df5be4042996e40904cfb71e00326a3525859b33073fa685d67dc562d84e37bca14c380c24900');

const DATABASE_ID = 'BouslaDB';
const COLLECTION_ID = 'applicants';

async function addAttributes() {
    console.log('🔧 Adding missing attributes to Applicants collection...\n');

    const attributes = [
        { key: 'portfolio', type: 'string', size: 500, required: false },
        { key: 'bio', type: 'string', size: 5000, required: false }
    ];

    for (const attr of attributes) {
        try {
            console.log(`  ➕ Adding ${attr.key}...`);
            await databases.createStringAttribute(
                DATABASE_ID,
                COLLECTION_ID,
                attr.key,
                attr.size,
                attr.required
            );
            console.log(`  ✅ ${attr.key} added successfully!`);
            // Wait to avoid rate limit
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            if (error.code === 409) {
                console.log(`  ⚠️  ${attr.key} already exists.`);
            } else {
                console.error(`  ❌ Error adding ${attr.key}:`, error.message);
            }
        }
    }
    console.log('\n✨ Done!');
}

addAttributes();
