// tests/FetchWrapper.test.ts
import { FetchWrapper } from '../../src/utils/FetchWrapper';

// Mock del método global fetch
global.fetch = jest.fn();

describe('FetchWrapper', () => {
  const baseUrl = 'https://api.example.com';
  const apiKey = 'testApiKey';
  const clientKey = 'testClientKey';
  let fetchWrapper: FetchWrapper;

  beforeEach(() => {
    fetchWrapper = new FetchWrapper(baseUrl, apiKey, clientKey);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should construct the correct URL with parameters', async () => {
    const endpoint = 'test-endpoint';
    const params = { query: 'testQuery' };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    await fetchWrapper.get(endpoint, params);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/test-endpoint?key=testApiKey&query=testQuery&client_key=testClientKey',
    );
  });

  test('should throw an error if response is not ok', async () => {
    const endpoint = 'test-endpoint';

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(fetchWrapper.get(endpoint)).rejects.toThrow(
      'Error: 404 Not Found',
    );
  });

  test('should return JSON response if request is successful', async () => {
    const endpoint = 'test-endpoint';
    const mockResponse = { data: 'testData' };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchWrapper.get(endpoint);

    expect(result).toEqual(mockResponse);
  });

  test('should handle requests without clientKey', async () => {
    fetchWrapper = new FetchWrapper(baseUrl, apiKey); // Sin clientKey
    const endpoint = 'test-endpoint';
    const params = { query: 'testQuery' };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    await fetchWrapper.get(endpoint, params);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/test-endpoint?key=testApiKey&query=testQuery',
    );
  });
});
