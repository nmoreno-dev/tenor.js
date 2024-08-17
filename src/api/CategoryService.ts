// src/api/CategoryService.ts

import { FetchWrapper } from '../utils/FetchWrapper';
import { CategoryObject } from './interfaces/CategoryObject';

export interface CategoriesParams {
  country?: string;
  locale?: string;
  type?: 'featured' | 'trending';
  contentfilter?: 'off' | 'low' | 'medium' | 'high';
}

export interface CategoriesResponse {
  tags: CategoryObject[];
}

export class CategoryService {
  private fetchWrapper: FetchWrapper;

  constructor(fetchWrapper: FetchWrapper) {
    this.fetchWrapper = fetchWrapper;
  }

  /**
   * Fetches a list of GIF categories associated with the provided type.
   *
   * @param params - An object containing the parameters for the request.
   * @returns A promise that resolves to a CategoriesResponse containing the list of categories.
   */
  public async getCategories(
    params: CategoriesParams = {},
  ): Promise<CategoriesResponse> {
    const endpoint = 'categories';
    return this.fetchWrapper.get<CategoriesResponse>(endpoint, params);
  }
}
