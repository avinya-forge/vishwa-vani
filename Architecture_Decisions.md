
### Semantic Deep-Linking Automated Script (FEAT-SEM-003)
- Created `scripts/generate_semantic_links.py` to automatically discover and index cross-scriptural semantic links.
- Extracted synonyms, english labels, and sanskrit labels from `data/ontology/tattvas.json`.
- Script iterates through the Gold tier texts (ignoring book.meta.json shards) and matches terms to verse originals, translations, and meanings.
- Automatically populated 797 new cross-references to the Tattvas, expanding the Knowledge Graph.
