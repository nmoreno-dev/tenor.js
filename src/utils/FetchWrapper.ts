// src/utils/FetchWrapper.ts

export class FetchWrapper {
  private baseUrl: string;
  private apiKey: string;
  private clientKey?: string;

  constructor(baseUrl: string, apiKey: string, clientKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.clientKey = clientKey;
  }

  private async request<T>(
    endpoint: string,
    params: Record<string, any>,
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}/${endpoint}`);
    url.search = new URLSearchParams({
      key: this.apiKey,
      ...params,
      ...(this.clientKey ? { client_key: this.clientKey } : {}),
    }).toString();

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  public get<T>(
    endpoint: string,
    params: Record<string, any> = {},
  ): Promise<T> {
    return this.request<T>(endpoint, params);
  }
}
