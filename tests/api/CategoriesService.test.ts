// tests/api/CategoryService.test.ts

import {
  CategoryService,
  CategoriesParams,
  CategoriesResponse,
} from '../../src/api/CategoryService';
import { FetchWrapper } from '../../src/utils/FetchWrapper';
import { CategoryObject } from '../../src/api/interfaces/CategoryObject';

jest.mock('../../src/utils/FetchWrapper');

describe('CategoryService', () => {
  let fetchWrapper: FetchWrapper;
  let categoryService: CategoryService;

  beforeEach(() => {
    fetchWrapper = new FetchWrapper(
      'https://tenor.googleapis.com/v2',
      'testApiKey',
    );
    categoryService = new CategoryService(fetchWrapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch categories with default parameters', async () => {
    const mockResponse: CategoriesResponse = {
      tags: [
        {
          name: 'Category 1',
          path: 'path1',
          image: 'image1',
          searchterm: 'term1',
        } as CategoryObject,
      ],
    };
    jest.spyOn(fetchWrapper, 'get').mockResolvedValue(mockResponse);

    const response = await categoryService.getCategories();

    expect(fetchWrapper.get).toHaveBeenCalledWith('categories', {});
    expect(response).toEqual(mockResponse);
  });

  it('should fetch categories with specific parameters', async () => {
    const mockResponse: CategoriesResponse = {
      tags: [
        {
          name: 'Category 2',
          path: 'path2',
          image: 'image2',
          searchterm: 'term2',
        } as CategoryObject,
      ],
    };
    const params: CategoriesParams = { locale: 'en_US', type: 'trending' };
    jest.spyOn(fetchWrapper, 'get').mockResolvedValue(mockResponse);

    const response = await categoryService.getCategories(params);

    expect(fetchWrapper.get).toHaveBeenCalledWith('categories', params);
    expect(response).toEqual(mockResponse);
  });

  it('should throw an error when fetch fails', async () => {
    const params: CategoriesParams = { type: 'featured' };
    jest
      .spyOn(fetchWrapper, 'get')
      .mockRejectedValue(new Error('Network Error'));

    await expect(categoryService.getCategories(params)).rejects.toThrow(
      'Network Error',
    );
  });
});
