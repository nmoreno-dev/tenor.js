// tests/api/AutocompleteService.test.ts

import {
  AutocompleteService,
  AutocompleteParams,
  AutocompleteResponse,
} from '../../src/api/AutocompleteService';
import { FetchWrapper } from '../../src/utils/FetchWrapper';

jest.mock('../../src/utils/FetchWrapper');

describe('AutocompleteService', () => {
  let fetchWrapper: FetchWrapper;
  let autocompleteService: AutocompleteService;

  beforeEach(() => {
    fetchWrapper = new FetchWrapper(
      'https://tenor.googleapis.com/v2',
      'testApiKey',
    );
    autocompleteService = new AutocompleteService(fetchWrapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch autocomplete results with the required search term', async () => {
    const mockResponse: AutocompleteResponse = {
      results: ['complete1', 'complete2', 'complete3'],
    };
    const params: AutocompleteParams = { q: 'fun' };
    jest.spyOn(fetchWrapper, 'get').mockResolvedValue(mockResponse);

    const response = await autocompleteService.getAutocomplete(params);

    expect(fetchWrapper.get).toHaveBeenCalledWith('autocomplete', params);
    expect(response).toEqual(mockResponse);
  });

  it('should fetch autocomplete results with specific parameters', async () => {
    const mockResponse: AutocompleteResponse = { results: ['complete1'] };
    const params: AutocompleteParams = { q: 'fun', locale: 'en_US', limit: 1 };
    jest.spyOn(fetchWrapper, 'get').mockResolvedValue(mockResponse);

    const response = await autocompleteService.getAutocomplete(params);

    expect(fetchWrapper.get).toHaveBeenCalledWith('autocomplete', params);
    expect(response).toEqual(mockResponse);
  });

  it('should throw an error when fetch fails', async () => {
    const params: AutocompleteParams = { q: 'fun' };
    jest
      .spyOn(fetchWrapper, 'get')
      .mockRejectedValue(new Error('Network Error'));

    await expect(autocompleteService.getAutocomplete(params)).rejects.toThrow(
      'Network Error',
    );
  });
});
