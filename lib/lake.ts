'use client'

/**
 * Vishwa-Vani: Multi-Lake Worker-Bound Interface 🪷
 * 
 * Offloads all binary shard operations to a background thread to ensure
 * a butter-smooth 60fps UI, even while querying millions of verses.
 */

let worker: Worker | null = null;
let requestCounter = 0;
const pendingRequests: Record<number, { resolve: Function, reject: Function }> = {};

function getWorker(): Worker {
  if (worker) return worker;
  
  worker = new Worker(new URL('./lake.worker', import.meta.url));
  worker.onmessage = (event) => {
    const { id, payload, error, type } = event.data;
    if (pendingRequests[id]) {
      if (error) pendingRequests[id].reject(new Error(error));
      else {
        // Handle result mapping based on response type
        if (type === 'QUERY_SUCCESS') pendingRequests[id].resolve(payload.verses);
        else if (type === 'SEARCH_SUCCESS') pendingRequests[id].resolve(payload.results);
        else pendingRequests[id].resolve(payload);
      }
      delete pendingRequests[id];
    }
  };
  return worker;
}

function sendRequest(type: string, payload: any): Promise<any> {
    const id = ++requestCounter;
    return new Promise((resolve, reject) => {
        pendingRequests[id] = { resolve, reject };
        getWorker().postMessage({ type, id, payload });
    });
}

/**
 * Query the specific lake shard for verses.
 */
export async function getVersesFromLake(textSlug: string, chapter: number, lakeFile: string = 'vedic-lake.db') {
  return sendRequest('QUERY_VERSES', { textSlug, chapter, lakeFile });
}

/**
 * Global Search across the shard.
 */
export async function searchLake(query: string, lakeFile: string = 'vedic-lake.db') {
  if (!query || query.length < 2) return [];
  return sendRequest('SEARCH_LAKE', { query, lakeFile });
}

/**
 * Pre-initialize a shard to warm up context.
 */
export async function prefetchLake(lakeFile: string) {
    return sendRequest('INIT_LAKE', { lakeFile });
}
