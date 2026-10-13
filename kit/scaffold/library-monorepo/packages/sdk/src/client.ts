export interface SdkOptions {
  baseUrl: string;
  token?: string;
  fetch?: typeof fetch;
}

export function createSdk(options: SdkOptions) {
  const doFetch = options.fetch ?? fetch;

  async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const response = await doFetch(`${options.baseUrl}${path}`, {
      ...init,
      headers: {
        "content-type": "application/json",
        ...(options.token ? { authorization: `Bearer ${options.token}` } : {}),
        ...init.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`SDK ${response.status} ${response.statusText}: ${path}`);
    }
    return (await response.json()) as T;
  }

  return { request };
}

export type Sdk = ReturnType<typeof createSdk>;
