import json
import os

file_path = "d:/Code/avinya-forge/vishwa-vani/data/3-gold/mahabharata/mahabharata-chapter-1.json"

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Update the first fragment (invocation)
if len(data) > 0:
    data[0]["original"] = "नारायणं नमस्कृत्य नरं चैव नरोत्तमम् | देवीं सरस्वतीं चैव ततो जयमुदीरयेत् ||०||"
    data[0]["transliteration"] = "nārāyaṇaṃ namaskṛtya naraṃ caiva narottamam | devīṃ sarasvatīṃ caiva tato jayamudīrayet ||0||"
    
    # Clean up the KMG content to focus on the invocation first if it's messy
    # But usually, we want to keep the prose. 
    # Let's just strip the "The Complete Mahabharata..." header if it's there.
    content = data[0]["layers"][0]["content"]
    prefix = "The Complete Mahabharata in English... SECTION I "
    if "SECTION I" in content:
        # Keep only the part after SECTION I or similar
        content = content.split("SECTION I")[-1].strip()
        data[0]["layers"][0]["content"] = content

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Successfully patched Chapter 1 with Sanskrit Invocation.")
