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

async function checkOrphans() {
    console.log('Checking for tables...');

    // We can't query information_schema easily with supabase-js unless we use .rpc or if we have permissions.
    // But we can try to select from likely tables.

    const tables = ['dictionary', 'shlokas'];

    for (const t of tables) {
        const { error } = await supabase.from(t).select('id').limit(1);
        if (error && error.code === '42P01') {
            console.log(`[MISSING] Table '${t}' does not exist.`);
        } else if (error) {
            console.log(`[Existent?] Table '${t}' found but error: ${error.message}`);
        } else {
            console.log(`[OK] Table '${t}' exists.`);
        }
    }
}

checkOrphans();
