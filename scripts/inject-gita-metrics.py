import json
import os
import glob

# Gita Path
gita_path = "d:/Code/avinya-forge/vishwa-vani/data/3-gold/bhagavad-gita/bhagavad-gita-chapter-*.json"
files = glob.glob(gita_path)

# Meta Mapping (Sample specialty focus for all 18 chapters)
specialty_map = {
    "1": {"focus": ["Arjuna-Vishada", "Dharma-Sankata"], "description": "The psychological crisis of the individual and the shift toward Dharma."},
    "2": {"focus": ["Samkhya", "Soul Immortality"], "description": "The eternal nature of the soul and the foundational philosophy of life."},
    "3": {"focus": ["Karma Yoga", "Selfless Action"], "description": "The path of dedicated action without attachment to results."},
    "4": {"focus": ["Jnana Yoga", "Avatar Science"], "description": "Descents of the Divine and the cultivation of transcendental knowledge."},
    "5": {"focus": ["Renunciation", "Internal Peace"], "description": "The synthesis of renunciation and action in consciousness."},
    "6": {"focus": ["Dhyana Yoga", "Mind Control"], "description": "The science of meditation and the discipline of the self."},
    "7": {"focus": ["Absolute Knowledge", "Maya"], "description": "Understanding the material and spiritual energies of the Supreme."},
    "8": {"focus": ["Akshara Brahma", "The Beyond"], "description": "The ultimate destination and the practice of remembrance."},
    "9": {"focus": ["Raja Vidya", "Bhakti"], "description": "The most confidential knowledge of devotion and supreme protection."},
    "10": {"focus": ["Vibhuti", "Divine Opulences"], "description": "The infinite manifestations of the Divine in the material world."},
    "11": {"focus": ["Vishwarupa", "Universal Form"], "description": "The stunning revelation of the cosmic totality to Arjuna."},
    "12": {"focus": ["Bhakti Yoga", "Devotional Service"], "description": "The characteristics of a perfect devotee and the path of love."},
    "13": {"focus": ["Kshetra", "Kshetrajna"], "description": "The distinction between the body and the knower of the body."},
    "14": {"focus": ["Gunas", "Qualities of Nature"], "description": "Transcending the three modes of material nature: Sattva, Rajas, Tamas."},
    "15": {"focus": ["Purushottama", "Supreme Person"], "description": "The yoga of the Supreme Person and the Banyan tree metaphor."},
    "16": {"focus": ["Daiva-Asura", "Dual Nature"], "description": "The divine and demoniac natures and their consequences."},
    "17": {"focus": ["Shraddha", "Faith"], "description": "Manifestations of faith in activities, food, and sacrifice."},
    "18": {"focus": ["Moksha", "Sannyasa"], "description": "The final conclusion of the Gita: Surrender and ultimate liberation."}
}

for f in files:
    try:
        ch_num = f.split("chapter-")[-1].split(".json")[0]
        meta = specialty_map.get(ch_num, {"focus": ["Dharma"], "description": "Scholarly exploration of the scriptural narrative."})
        
        with open(f, 'r', encoding='utf-8') as file:
            data = json.load(file)
            
        # Update first fragment as the manifest carrier
        if data and len(data) > 0:
            if "ai_metadata" not in data[0]:
                data[0]["ai_metadata"] = {}
            
            data[0]["ai_metadata"]["specialty"] = meta
            
        with open(f, 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, indent=2)
            
        print(f"Updated Chapter {ch_num} with AI Specialty Metrics.")
    except Exception as e:
        print(f"Failed for {f}: {e}")

print("Complete Gold Data Audit Finished.")
