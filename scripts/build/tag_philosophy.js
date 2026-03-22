const fs = require('fs');
const path = require('path');

const TOPIC_MAP = {
    'dharma': ['duty', 'righteousness', 'dharma', 'law'],
    'yoga': ['yoga', 'meditation', 'union', 'path'],
    'bhakti': ['devotion', 'love', 'bhakti', 'surrender', 'god', 'lord', 'krishna', 'vishnu'],
    'karma': ['action', 'work', 'karma', 'service', 'fruit'],
    'jnana': ['knowledge', 'wisdom', 'truth', 'self', 'brahman', 'atma'],
    'maya': ['illusion', 'maya', 'unreal', 'dream', 'world'],
    'liberation': ['moksha', 'liberation', 'freedom', 'peace', 'eternal'],
    'battle': ['battle', 'war', 'army', 'warrior', 'fight', 'kurukshetra'],
};

const dataDir = path.join(process.cwd(), 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
        if (!Array.isArray(data)) return;

        let changed = false;
        data.forEach(v => {
            const topics = new Set(v.ai_metadata?.topics || []);
            const fullText = JSON.stringify(v).toLowerCase();

            Object.entries(TOPIC_MAP).forEach(([topic, keywords]) => {
                if (keywords.some(k => fullText.includes(k))) {
                    topics.add(topic);
                }
            });

            if (topics.size > (v.ai_metadata?.topics?.length || 0)) {
                v.ai_metadata = { ...v.ai_metadata, topics: Array.from(topics) };
                changed = true;
            }
        });

        if (changed) {
            fs.writeFileSync(path.join(dataDir, file), JSON.stringify(data, null, 2));
            console.log(`[Tagged] ${file} with philosophical topics.`);
        }
    } catch (e) {
        console.error(`Error tagging ${file}: ${e.message}`);
    }
});
