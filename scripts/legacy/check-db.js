const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env.local
const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const getEnvParam = (key) => {
    const match = envContent.match(new RegExp(`${key}=(.*)`));
    return match ? match[1].trim() : null;
};

const url = getEnvParam('NEXT_PUBLIC_SUPABASE_URL');
const key = getEnvParam('NEXT_PUBLIC_SUPABASE_ANON_KEY');

if (!url || !key) {
    console.error('Missing URL or Key in .env.local');
    process.exit(1);
}

const supabase = createClient(url, key);

async function check() {
    console.log('Testing connection to:', url);

    // Try to select from 'shlokas' table
    const { data, error } = await supabase.from('shlokas').select('count', { count: 'exact', head: true });

    if (error) {
        console.log('Error Code:', error.code);
        console.log('Error Message:', error.message);

        if (error.code === '42P01' || error.message.includes('relation') || error.message.includes('not exist')) {
            console.log('FAILURE: Connected, but "shlokas" table DOES NOT EXIST. Please run schema.sql.');
        } else if (error.code === 'PGRST301' || error.message.includes('JWT')) {
            console.log('FAILURE: Auth Error. Check your keys.');
        } else {
            console.log('FAILURE: Unknown error:', error.message);
        }
    } else {
        console.log('SUCCESS: Connected and "shlokas" table found.');
    }
}

check();
