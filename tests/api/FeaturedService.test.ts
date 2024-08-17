// tests/api/FeaturedService.test.ts

import {
  FeaturedService,
  FeaturedParams,
  FeaturedResponse,
} from '../../src/api/FeaturedService';
import { FetchWrapper } from '../../src/utils/FetchWrapper';
import { ResponseObject } from '../../src/api/interfaces/ResponseObject';

jest.mock('../../src/utils/FetchWrapper');

describe('FeaturedService', () => {
  let fetchWrapper: FetchWrapper;
  let featuredService: FeaturedService;

  beforeEach(() => {
    fetchWrapper = new FetchWrapper(
      'https://tenor.googleapis.com/v2',
      'testApiKey',
    );
    featuredService = new FeaturedService(fetchWrapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch featured GIFs with default parameters', async () => {
    const mockResponse: FeaturedResponse = {
      next: 'next_token',
      results: [
        {
          id: '1',
          title: 'Featured 1',
          media_formats: {},
          created: 1234567890,
        } as ResponseObject,
      ],
    };
    jest.spyOn(fetchWrapper, 'get').mockResolvedValue(mockResponse);

    const response = await featuredService.getFeatured();

    expect(fetchWrapper.get).toHaveBeenCalledWith('featured', {});
    expect(response).toEqual(mockResponse);
  });

  it('should fetch featured GIFs with specific parameters', async () => {
    const mockResponse: FeaturedResponse = {
      next: 'next_token',
      results: [
        {
          id: '1',
          title: 'Featured 1',
          media_formats: {},
          created: 1234567890,
        } as ResponseObject,
      ],
    };
    const params: FeaturedParams = { locale: 'en_US', limit: 5 };
    jest.spyOn(fetchWrapper, 'get').mockResolvedValue(mockResponse);

    const response = await featuredService.getFeatured(params);

    expect(fetchWrapper.get).toHaveBeenCalledWith('featured', params);
    expect(response).toEqual(mockResponse);
  });

  it('should throw an error when fetch fails', async () => {
    const params: FeaturedParams = { locale: 'en_US', limit: 5 };
    jest
      .spyOn(fetchWrapper, 'get')
      .mockRejectedValue(new Error('Network Error'));

    await expect(featuredService.getFeatured(params)).rejects.toThrow(
      'Network Error',
    );
  });

  it('should fetch next page of featured results with the next token', async () => {
    const mockResponse: FeaturedResponse = {
      next: 'next_token_2',
      results: [
        {
          id: '2',
          title: 'Featured 2',
          media_formats: {},
          created: 1234567890,
        } as ResponseObject,
      ],
    };
    jest.spyOn(fetchWrapper, 'get').mockResolvedValue(mockResponse);

    const response = await featuredService.fetchNext('next_token');

    expect(fetchWrapper.get).toHaveBeenCalledWith('featured', {
      pos: 'next_token',
    });
    expect(response).toEqual(mockResponse);
  });
});
