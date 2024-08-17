// tests/api/SuggestionsService.test.ts

import {
  SuggestionsService,
  SuggestionsParams,
  SuggestionsResponse,
} from '../../src/api/SuggestionsService';
import { FetchWrapper } from '../../src/utils/FetchWrapper';

jest.mock('../../src/utils/FetchWrapper');

describe('SuggestionsService', () => {
  let fetchWrapper: FetchWrapper;
  let suggestionsService: SuggestionsService;

  beforeEach(() => {
    fetchWrapper = new FetchWrapper(
      'https://tenor.googleapis.com/v2',
      'testApiKey',
    );
    suggestionsService = new SuggestionsService(fetchWrapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch suggestions with the required search term', async () => {
    const mockResponse: SuggestionsResponse = {
      results: ['suggestion1', 'suggestion2', 'suggestion3'],
    };
    const params: SuggestionsParams = { q: 'funny' };
    jest.spyOn(fetchWrapper, 'get').mockResolvedValue(mockResponse);

    const response = await suggestionsService.getSuggestions(params);

    expect(fetchWrapper.get).toHaveBeenCalledWith('search_suggestions', params);
    expect(response).toEqual(mockResponse);
  });

  it('should fetch suggestions with specific parameters', async () => {
    const mockResponse: SuggestionsResponse = { results: ['suggestion1'] };
    const params: SuggestionsParams = { q: 'funny', locale: 'en_US', limit: 1 };
    jest.spyOn(fetchWrapper, 'get').mockResolvedValue(mockResponse);

    const response = await suggestionsService.getSuggestions(params);

    expect(fetchWrapper.get).toHaveBeenCalledWith('search_suggestions', params);
    expect(response).toEqual(mockResponse);
  });

  it('should throw an error when fetch fails', async () => {
    const params: SuggestionsParams = { q: 'funny' };
    jest
      .spyOn(fetchWrapper, 'get')
      .mockRejectedValue(new Error('Network Error'));

    await expect(suggestionsService.getSuggestions(params)).rejects.toThrow(
      'Network Error',
    );
  });

  it('should fetch suggestions with country and locale parameters', async () => {
    const mockResponse: SuggestionsResponse = {
      results: ['suggestion1', 'suggestion2'],
    };
    const params: SuggestionsParams = {
      q: 'funny',
      country: 'US',
      locale: 'en_US',
    };
    jest.spyOn(fetchWrapper, 'get').mockResolvedValue(mockResponse);

    const response = await suggestionsService.getSuggestions(params);

    expect(fetchWrapper.get).toHaveBeenCalledWith('search_suggestions', params);
    expect(response).toEqual(mockResponse);
  });
});
