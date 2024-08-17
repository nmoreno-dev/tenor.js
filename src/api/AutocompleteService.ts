// src/api/AutocompleteService.ts

import { FetchWrapper } from '../utils/FetchWrapper';

export interface AutocompleteParams {
  q: string;
  country?: string;
  locale?: string;
  limit?: number;
}

export interface AutocompleteResponse {
  results: string[];
}

export class AutocompleteService {
  private fetchWrapper: FetchWrapper;

  constructor(fetchWrapper: FetchWrapper) {
    this.fetchWrapper = fetchWrapper;
  }

  /**
   * Fetches a list of completed search terms for a given partial search term.
   *
   * @param params - An object containing the search parameters.
   * @returns A promise that resolves to an AutocompleteResponse containing the completed search terms.
   */
  public async getAutocomplete(
    params: AutocompleteParams,
  ): Promise<AutocompleteResponse> {
    const endpoint = 'autocomplete';
    return this.fetchWrapper.get<AutocompleteResponse>(endpoint, params);
  }
}
