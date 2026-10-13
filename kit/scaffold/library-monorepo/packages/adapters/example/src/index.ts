import type { StorageAdapter } from "@org/core";

export interface MemoryStorageOptions {
  id?: string;
}

export function createMemoryStorage(options: MemoryStorageOptions = {}): StorageAdapter {
  const data = new Map<string, string>();
  return {
    id: options.id ?? "memory",
    async get(key) {
      return data.get(key);
    },
    async set(key, value) {
      data.set(key, value);
    },
    async remove(key) {
      data.delete(key);
    },
  };
}
