// src/api/RegisterShareService.ts

import { FetchWrapper } from '../utils/FetchWrapper';

export interface RegisterShareParams {
  id: string;
  country?: string;
  locale?: string;
  q?: string;
}

export class RegisterShareService {
  private fetchWrapper: FetchWrapper;

  constructor(fetchWrapper: FetchWrapper) {
    this.fetchWrapper = fetchWrapper;
  }

  /**
   * Registers a user's sharing of a GIF or sticker.
   *
   * @param params - An object containing the parameters for the request, including the ID of the shared object.
   * @returns A promise that resolves when the share is registered.
   *          The API response does not include a body, so the success is determined by the HTTP status code.
   */
  public async registerShare(params: RegisterShareParams): Promise<void> {
    const endpoint = 'registershare';
    await this.fetchWrapper.get<void>(endpoint, params);
  }
}
