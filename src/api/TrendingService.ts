// src/api/TrendingService.ts

import { FetchWrapper } from '../utils/FetchWrapper';

export interface TrendingParams {
  country?: string;
  locale?: string;
  limit?: number;
}

export interface TrendingResponse {
  results: string[];
}

export class TrendingService {
  private fetchWrapper: FetchWrapper;

  constructor(fetchWrapper: FetchWrapper) {
    this.fetchWrapper = fetchWrapper;
  }

  /**
   * Fetches a list of the current trending search terms.
   *
   * @param params - An object containing the parameters for the request.
   * @returns A promise that resolves to a TrendingResponse containing the trending search terms.
   */
  public async getTrendingTerms(
    params: TrendingParams = {},
  ): Promise<TrendingResponse> {
    const endpoint = 'trending_terms';
    return this.fetchWrapper.get<TrendingResponse>(endpoint, params);
  }
}
