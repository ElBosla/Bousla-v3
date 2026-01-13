// Appwrite Configuration
const { Client, Account, Databases, Storage, ID, Query } = Appwrite;

const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // Appwrite Endpoint
    .setProject('696446d40034324177b2'); // Project ID: Bousla

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Constants for Database and Collections
const DATABASE_ID = 'BouslaDB';
const COLLECTIONS = {
    APPLICANTS: 'applicants',
    PAGE_VISITS: 'page_visits',
    CONSULTATIONS: 'consultations',
    ADMINS: 'admins',
    CALENDAR_CONTENT: 'calendar_content',
    GLOBAL_TASKS: 'global_tasks',
    TEACHERS: 'teachers',
    MESSAGES: 'messages',
    TRANSACTIONS: 'transactions',
    FINANCE_TODOS: 'finance_todos',
    TRAINEES: 'trainees'
};

// Verify Appwrite connection on load
client.ping()
    .then(response => {
        console.log('✅ Appwrite connection successful!', response);
    })
    .catch(error => {
        console.error('❌ Appwrite connection failed:', error);
    });

// Export instances (since we are using vanilla JS, we attach to window)
window.appwrite = {
    client,
    account,
    databases,
    storage,
    ID,
    Query,
    DATABASE_ID,
    COLLECTIONS
};
