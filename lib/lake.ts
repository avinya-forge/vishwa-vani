'use client'

import { VEDIC_LIBRARY } from './texts'

/**
 * Vishwa-Vani: Multi-Lake API Interface 🪷
 * 
 * Offloads all binary shard operations to a server route to protect 
 * our scripture data from scraping.
 */

async function fetchFromApi(payload: unknown) {
  const response = await fetch('/api/lake', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch from lake API');
  }
  
  return response.json();
}

/**
 * Query the specific lake shard for verses.
 */
export async function getVersesFromLake(textSlug: string, chapter: number, lakeFile: string = 'vedic-lake.db') {
  const data = await fetchFromApi({ action: 'QUERY_VERSES', textSlug, chapter, lakeFile });
  return data.verses || [];
}

/**
 * Global Discovery search across all sharded lakes.
 */
export async function searchLake(query: string) {
  if (!query || query.length < 2) return [];
  
  // Find all unique lake shards mentioned in registry
  const shards = Array.from(new Set(
    VEDIC_LIBRARY
      .filter(t => t.available && t.storage === 'lake' && t.lakeFile)
      .map(t => t.lakeFile as string)
  ));

  if (shards.length === 0) {
    const data = await fetchFromApi({ action: 'SEARCH_LAKE', query, lakeFile: 'vedic-lake.db' });
    return data.results || [];
  }

  // Parallel search across all shards
  const shardPromises = shards.map(shard => fetchFromApi({ action: 'SEARCH_LAKE', query, lakeFile: shard }));
  const resultsArr = await Promise.all(shardPromises);
  
  // Flatten and deduplicate
  return resultsArr.map(res => res.results || []).flat();
}

/**
 * Pre-initialize a shard to warm up context.
 */
export async function prefetchLake(_lakeFile: string) {
    // No-op for API
    return true;
}

