
## Search Implementation
*   **Decision**: Opted for a direct RPC call `search_words_fuzzy` rather than building complex dynamic OR/ILIKE chains inside Prisma/SupabaseJS. This allows standardizing search across platforms and ensures indices are used correctly by the database engine.
*   **Decision**: Auto-complete debouncing handles queries directly through Server Actions (`searchWordsAction`) inside the Client Component `SearchBar`, bypassing route changes until selection or submit.
