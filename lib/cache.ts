// Simple model cache using IndexedDB via idb-keyval
import { set, get, clear } from 'idb-keyval';

export async function cacheModel(key: string, data: ArrayBuffer) {
  await set(key, data);
}

export async function getCachedModel(key: string): Promise<ArrayBuffer | undefined> {
  return await get(key);
}

export async function clearModelCache() {
  await clear();
}
