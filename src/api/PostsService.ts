// src/api/PostsService.ts

import { FetchWrapper } from '../utils/FetchWrapper';
import { ResponseObject } from './interfaces/ResponseObject';

export interface PostsParams {
  ids: string;
  media_filter?: string;
}

export interface PostsResponse {
  results: ResponseObject[];
}

export class PostsService {
  private fetchWrapper: FetchWrapper;

  constructor(fetchWrapper: FetchWrapper) {
    this.fetchWrapper = fetchWrapper;
  }

  /**
   * Fetches the GIFs, stickers, or a combination of the two for the specified IDs.
   *
   * @param params - An object containing the parameters for the request, including the IDs of the posts.
   * @returns A promise that resolves to a PostsResponse containing the requested media.
   */
  public async getPosts(params: PostsParams): Promise<PostsResponse> {
    const endpoint = 'posts';
    return this.fetchWrapper.get<PostsResponse>(endpoint, params);
  }
}
