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

const supabase = createClient(url, key);

async function verify() {
    console.log('Verifying content...');

    // Check Dictionary
    const { count: dictCount, error: dictError } = await supabase
        .from('dictionary')
        .select('*', { count: 'exact', head: true });

    if (dictError) {
        console.error('Dictionary Error:', dictError.message);
    } else {
        console.log(`Dictionary Entries: ${dictCount}`);
    }

    // Check Shlokas
    const { data: shlokas, error: shlokaError } = await supabase
        .from('shlokas')
        .select('*')
        .limit(1);

    if (shlokaError) {
        console.error('Shloka Error:', shlokaError.message);
    } else if (shlokas.length > 0) {
        console.log(`Shlokas Found: ${shlokas.length}`);
        console.log('Sample Source:', shlokas[0].source_text);
        console.log('Word Mapping Size (JSON):', JSON.stringify(shlokas[0].word_mapping).length);
    } else {
        console.log('No Shlokas found.');
    }
}

verify();
