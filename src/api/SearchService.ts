// src/api/SearchService.ts

import { FetchWrapper } from '../utils/FetchWrapper';
import { ResponseObject } from './interfaces/ResponseObject';

export interface SearchParams {
  q: string;
  searchfilter?: string;
  country?: string;
  locale?: string;
  contentfilter?: 'off' | 'low' | 'medium' | 'high';
  media_filter?: string;
  ar_range?: 'all' | 'wide' | 'standard';
  random?: boolean;
  limit?: number;
  pos?: string;
}

export interface SearchResponse {
  next: string;
  results: ResponseObject[];
}

export class SearchService {
  private fetchWrapper: FetchWrapper;

  constructor(fetchWrapper: FetchWrapper) {
    this.fetchWrapper = fetchWrapper;
  }

  /**
   * Searches for GIFs, stickers, or other media types based on the provided parameters.
   *
   * @param params - An object containing the search parameters.
   * @returns A promise that resolves to a SearchResponse containing the search results and the next page token.
   */
  public async query(
    params: SearchParams | { pos: string },
  ): Promise<SearchResponse> {
    const endpoint = 'search';
    return this.fetchWrapper.get<SearchResponse>(endpoint, params);
  }

  /**
   * Fetches the next page of results based on the provided next token.
   *
   * @param next - The next page token from a previous search response.
   * @returns A promise that resolves to a SearchResponse containing the next set of results.
   */
  public async fetchNext(next: string): Promise<SearchResponse> {
    return this.query({ pos: next });
  }
}
