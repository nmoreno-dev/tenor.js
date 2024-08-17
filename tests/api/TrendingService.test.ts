// tests/api/TrendingService.test.ts

import {
  TrendingService,
  TrendingParams,
  TrendingResponse,
} from '../../src/api/TrendingService';
import { FetchWrapper } from '../../src/utils/FetchWrapper';

jest.mock('../../src/utils/FetchWrapper');

describe('TrendingService', () => {
  let fetchWrapper: FetchWrapper;
  let trendingService: TrendingService;

  beforeEach(() => {
    fetchWrapper = new FetchWrapper(
      'https://tenor.googleapis.com/v2',
      'testApiKey',
    );
    trendingService = new TrendingService(fetchWrapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch trending terms with default parameters', async () => {
    const mockResponse: TrendingResponse = {
      results: ['term1', 'term2', 'term3'],
    };
    jest.spyOn(fetchWrapper, 'get').mockResolvedValue(mockResponse);

    const response = await trendingService.getTrendingTerms();

    expect(fetchWrapper.get).toHaveBeenCalledWith('trending_terms', {});
    expect(response).toEqual(mockResponse);
  });

  it('should fetch trending terms with specific parameters', async () => {
    const mockResponse: TrendingResponse = { results: ['term1', 'term2'] };
    const params: TrendingParams = { locale: 'en_US', limit: 2 };
    jest.spyOn(fetchWrapper, 'get').mockResolvedValue(mockResponse);

    const response = await trendingService.getTrendingTerms(params);

    expect(fetchWrapper.get).toHaveBeenCalledWith('trending_terms', params);
    expect(response).toEqual(mockResponse);
  });

  it('should throw an error when fetch fails', async () => {
    jest
      .spyOn(fetchWrapper, 'get')
      .mockRejectedValue(new Error('Network Error'));

    await expect(trendingService.getTrendingTerms()).rejects.toThrow(
      'Network Error',
    );
  });

  it('should fetch trending terms with country and locale parameters', async () => {
    const mockResponse: TrendingResponse = {
      results: ['term1', 'term2', 'term3'],
    };
    const params: TrendingParams = { country: 'US', locale: 'en_US' };
    jest.spyOn(fetchWrapper, 'get').mockResolvedValue(mockResponse);

    const response = await trendingService.getTrendingTerms(params);

    expect(fetchWrapper.get).toHaveBeenCalledWith('trending_terms', params);
    expect(response).toEqual(mockResponse);
  });
});
