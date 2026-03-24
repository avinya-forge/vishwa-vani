import os

file_path = "d:/Code/avinya-forge/vishwa-vani/components/shloka/study-client.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the specific scholar selection map
old_scholar_line = "{AUTHOR_METADATA[c.author]?.name || (c.author.includes('iskcon') ? 'A.C. Bhaktivedanta Swami Prabhupada' : 'Sant Dnyaneshwar')}"
new_scholar_line = "{AUTHOR_METADATA[c.author]?.name || AUTHOR_METADATA[`${c.author}-en`]?.name || 'Sant Dnyaneshwar Maharaj'}"

if old_scholar_line in content:
    content = content.replace(old_scholar_line, new_scholar_line)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully updated scholarship card labels.")
else:
    print("Could not find the target string in study-client.tsx.")
    # Check for minor variations
    if "Sant Dnyaneshwar" in content:
        print("Found partial match 'Sant Dnyaneshwar'.")
