export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

export interface StorageAdapter {
  readonly id: string;
  get(key: string): Promise<string | undefined>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
}

export function createCore(initialAdapters: StorageAdapter[] = []) {
  const registry = new Map<string, StorageAdapter>();
  for (const adapter of initialAdapters) registry.set(adapter.id, adapter);

  return {
    register(adapter: StorageAdapter): void {
      registry.set(adapter.id, adapter);
    },
    storage(id: string): StorageAdapter {
      const adapter = registry.get(id);
      if (!adapter) throw new Error(`Unknown storage adapter: ${id}`);
      return adapter;
    },
    adapters(): string[] {
      return [...registry.keys()];
    },
  };
}

export type Core = ReturnType<typeof createCore>;
