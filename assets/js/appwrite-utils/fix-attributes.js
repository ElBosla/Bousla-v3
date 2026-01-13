/**
 * Fix Missing Attributes
 * This script adds the missing attributes that failed during initial setup
 * 
 * Usage: node fix-attributes.js
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

// Missing attributes to add
const missingAttributes = [
    {
        collection: 'applicants',
        attribute: {
            key: 'status',
            type: 'string',
            size: 50,
            required: false, // Changed to false to allow default
            default: 'pending'
        }
    },
    {
        collection: 'messages',
        attribute: {
            key: 'type',
            type: 'string',
            size: 50,
            required: false, // Changed to false to allow default
            default: 'text'
        }
    },
    {
        collection: 'page_visits',
        attribute: {
            key: 'os',
            type: 'string',
            size: 100,
            required: false,
            default: null
        }
    },
    {
        collection: 'calendar_content',
        attribute: {
            key: 'status',
            type: 'string',
            size: 50,
            required: false,
            default: 'draft'
        }
    }
];

async function fixAttribute(collectionId, attr) {
    try {
        console.log(`  ➕ Adding ${attr.key} to ${collectionId}...`);

        await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            attr.key,
            attr.size,
            attr.required,
            attr.default
        );

        console.log(`  ✅ ${attr.key} added successfully!`);
        return true;

    } catch (error) {
        if (error.code === 409) {
            console.log(`  ⚠️  ${attr.key} already exists, skipping...`);
        } else {
            console.error(`  ❌ Error adding ${attr.key}:`, error.message);
        }
        return false;
    }
}

async function fixAllAttributes() {
    console.log('🔧 Fixing missing attributes...\n');

    let fixed = 0;
    let skipped = 0;
    let failed = 0;

    for (const item of missingAttributes) {
        const result = await fixAttribute(item.collection, item.attribute);

        if (result) fixed++;
        else skipped++;

        // Wait between operations to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n📊 Summary:');
    console.log(`   ✅ Fixed: ${fixed}`);
    console.log(`   ⚠️  Skipped: ${skipped}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log('\n✨ Done!\n');
}

fixAllAttributes();
