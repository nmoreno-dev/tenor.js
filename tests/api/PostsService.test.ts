// tests/api/PostsService.test.ts

import {
  PostsService,
  PostsParams,
  PostsResponse,
} from '../../src/api/PostsService';
import { FetchWrapper } from '../../src/utils/FetchWrapper';
import { ResponseObject } from '../../src/api/interfaces/ResponseObject';

jest.mock('../../src/utils/FetchWrapper');

describe('PostsService', () => {
  let fetchWrapper: FetchWrapper;
  let postsService: PostsService;

  beforeEach(() => {
    fetchWrapper = new FetchWrapper(
      'https://tenor.googleapis.com/v2',
      'testApiKey',
    );
    postsService = new PostsService(fetchWrapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch posts with the required IDs', async () => {
    const mockResponse: PostsResponse = {
      results: [
        {
          id: '1',
          title: 'Post 1',
          media_formats: {},
          created: 1234567890,
        } as ResponseObject,
        {
          id: '2',
          title: 'Post 2',
          media_formats: {},
          created: 1234567890,
        } as ResponseObject,
      ],
    };
    const params: PostsParams = { ids: '1,2' };
    jest.spyOn(fetchWrapper, 'get').mockResolvedValue(mockResponse);

    const response = await postsService.getPosts(params);

    expect(fetchWrapper.get).toHaveBeenCalledWith('posts', params);
    expect(response).toEqual(mockResponse);
  });

  it('should fetch posts with specific media filter', async () => {
    const mockResponse: PostsResponse = {
      results: [
        {
          id: '1',
          title: 'Post 1',
          media_formats: {},
          created: 1234567890,
        } as ResponseObject,
      ],
    };
    const params: PostsParams = { ids: '1', media_filter: 'gif,mp4' };
    jest.spyOn(fetchWrapper, 'get').mockResolvedValue(mockResponse);

    const response = await postsService.getPosts(params);

    expect(fetchWrapper.get).toHaveBeenCalledWith('posts', params);
    expect(response).toEqual(mockResponse);
  });

  it('should throw an error when fetch fails', async () => {
    const params: PostsParams = { ids: '1,2' };
    jest
      .spyOn(fetchWrapper, 'get')
      .mockRejectedValue(new Error('Network Error'));

    await expect(postsService.getPosts(params)).rejects.toThrow(
      'Network Error',
    );
  });
});
