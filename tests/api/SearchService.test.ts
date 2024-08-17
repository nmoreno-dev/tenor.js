// tests/api/SearchService.test.ts

import {
  SearchService,
  SearchParams,
  SearchResponse,
} from '../../src/api/SearchService';
import { FetchWrapper } from '../../src/utils/FetchWrapper';

jest.mock('../../src/utils/FetchWrapper');

describe('SearchService', () => {
  let fetchWrapper: FetchWrapper;
  let searchService: SearchService;

  beforeEach(() => {
    fetchWrapper = new FetchWrapper(
      'https://tenor.googleapis.com/v2',
      'test-api-key',
    );
    searchService = new SearchService(fetchWrapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should perform a search and return results', async () => {
    const mockResponse: SearchResponse = {
      next: 'next-page-token',
      results: [
        {
          id: '1',
          media_formats: {},
          created: 0,
          tags: [],
          title: '',
          content_description: '',
          itemurl: '',
          hascaption: false,
          hasaudio: false,
          flags: '',
          bg_color: '',
          url: '',
        },
      ],
    };

    (fetchWrapper.get as jest.Mock).mockResolvedValue(mockResponse);

    const params: SearchParams = { q: 'funny cats', limit: 10 };
    const result = await searchService.query(params);

    expect(fetchWrapper.get).toHaveBeenCalledWith('search', params);
    expect(result).toEqual(mockResponse);
  });

  it('should fetch the next page of results', async () => {
    const mockResponse: SearchResponse = {
      next: 'next-page-token',
      results: [
        {
          id: '2',
          media_formats: {},
          created: 0,
          tags: [],
          title: '',
          content_description: '',
          itemurl: '',
          hascaption: false,
          hasaudio: false,
          flags: '',
          bg_color: '',
          url: '',
        },
      ],
    };

    (fetchWrapper.get as jest.Mock).mockResolvedValue(mockResponse);

    const nextPageToken = 'next-page-token';
    const result = await searchService.fetchNext(nextPageToken);

    expect(fetchWrapper.get).toHaveBeenCalledWith('search', {
      pos: nextPageToken,
    });
    expect(result).toEqual(mockResponse);
  });

  it('should handle search with minimal parameters', async () => {
    const mockResponse: SearchResponse = {
      next: '',
      results: [],
    };

    (fetchWrapper.get as jest.Mock).mockResolvedValue(mockResponse);

    const params: SearchParams = { q: 'dogs' };
    const result = await searchService.query(params);

    expect(fetchWrapper.get).toHaveBeenCalledWith('search', params);
    expect(result).toEqual(mockResponse);
  });

  it('should handle errors gracefully', async () => {
    (fetchWrapper.get as jest.Mock).mockRejectedValue(new Error('API error'));

    const params: SearchParams = { q: 'funny dogs' };

    await expect(searchService.query(params)).rejects.toThrow('API error');
  });
});
