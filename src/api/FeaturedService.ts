// src/api/FeaturedService.ts

import { FetchWrapper } from '../utils/FetchWrapper';
import { ResponseObject } from './interfaces/ResponseObject';

export interface FeaturedParams {
  searchfilter?: string;
  country?: string;
  locale?: string;
  media_filter?: string;
  ar_range?: 'all' | 'wide' | 'standard';
  contentfilter?: 'off' | 'low' | 'medium' | 'high';
  limit?: number;
  pos?: string;
}

export interface FeaturedResponse {
  next: string;
  results: ResponseObject[];
}

export class FeaturedService {
  private fetchWrapper: FetchWrapper;

  constructor(fetchWrapper: FetchWrapper) {
    this.fetchWrapper = fetchWrapper;
  }

  /**
   * Fetches a list of current global featured GIFs or stickers from the Tenor API.
   *
   * @param params - An object containing the parameters for the request.
   * @returns A promise that resolves to a FeaturedResponse containing the featured GIFs or stickers.
   */
  public async getFeatured(
    params: FeaturedParams = {},
  ): Promise<FeaturedResponse> {
    const endpoint = 'featured';
    return this.fetchWrapper.get<FeaturedResponse>(endpoint, params);
  }

  /**
   * Fetches the next page of featured results based on the provided next token.
   *
   * @param next - The next page token from a previous featured response.
   * @returns A promise that resolves to a FeaturedResponse containing the next set of featured results.
   */
  public async fetchNext(next: string): Promise<FeaturedResponse> {
    return this.getFeatured({ pos: next });
  }
}
