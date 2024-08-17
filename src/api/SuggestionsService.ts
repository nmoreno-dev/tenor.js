// src/api/SuggestionsService.ts

import { FetchWrapper } from '../utils/FetchWrapper';

export interface SuggestionsParams {
  q: string;
  country?: string;
  locale?: string;
  limit?: number;
}

export interface SuggestionsResponse {
  results: string[];
}

export class SuggestionsService {
  private fetchWrapper: FetchWrapper;

  constructor(fetchWrapper: FetchWrapper) {
    this.fetchWrapper = fetchWrapper;
  }

  /**
   * Fetches a list of alternative search terms (suggestions) for a given search term.
   *
   * @param params - An object containing the search parameters.
   * @returns A promise that resolves to a SuggestionsResponse containing the suggested search terms.
   */
  public async getSuggestions(
    params: SuggestionsParams,
  ): Promise<SuggestionsResponse> {
    const endpoint = 'search_suggestions';
    return this.fetchWrapper.get<SuggestionsResponse>(endpoint, params);
  }
}
