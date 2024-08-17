// tests/api/RegisterShareService.test.ts

import {
  RegisterShareService,
  RegisterShareParams,
} from '../../src/api/RegisterShareService';
import { FetchWrapper } from '../../src/utils/FetchWrapper';

jest.mock('../../src/utils/FetchWrapper');

describe('RegisterShareService', () => {
  let fetchWrapper: FetchWrapper;
  let registerShareService: RegisterShareService;

  beforeEach(() => {
    fetchWrapper = new FetchWrapper(
      'https://tenor.googleapis.com/v2',
      'testApiKey',
    );
    registerShareService = new RegisterShareService(fetchWrapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a share with the required ID', async () => {
    const params: RegisterShareParams = { id: '1234567890' };
    jest.spyOn(fetchWrapper, 'get').mockResolvedValue(undefined);

    await registerShareService.registerShare(params);

    expect(fetchWrapper.get).toHaveBeenCalledWith('registershare', params);
  });

  it('should register a share with all parameters', async () => {
    const params: RegisterShareParams = {
      id: '1234567890',
      country: 'US',
      locale: 'en_US',
      q: 'funny cats',
    };
    jest.spyOn(fetchWrapper, 'get').mockResolvedValue(undefined);

    await registerShareService.registerShare(params);

    expect(fetchWrapper.get).toHaveBeenCalledWith('registershare', params);
  });

  it('should throw an error when fetch fails', async () => {
    const params: RegisterShareParams = { id: '1234567890' };
    jest
      .spyOn(fetchWrapper, 'get')
      .mockRejectedValue(new Error('Network Error'));

    await expect(registerShareService.registerShare(params)).rejects.toThrow(
      'Network Error',
    );
  });
});
