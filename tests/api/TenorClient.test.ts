// tests/api/TenorClient.test.ts

import { TenorClient } from '../../src/api/TenorClient';
import { FetchWrapper } from '../../src/utils/FetchWrapper';
import { SearchService } from '../../src/api/SearchService';
import { FeaturedService } from '../../src/api/FeaturedService';
import { SuggestionsService } from '../../src/api/SuggestionsService';
import { AutocompleteService } from '../../src/api/AutocompleteService';
import { TrendingService } from '../../src/api/TrendingService';
import { RegisterShareService } from '../../src/api/RegisterShareService';
import { PostsService } from '../../src/api/PostsService';
import { CategoryService } from '../../src/api/CategoryService';

jest.mock('../../src/utils/FetchWrapper');

describe('TenorClient', () => {
  let client: TenorClient;

  beforeEach(() => {
    client = new TenorClient('testApiKey', 'testClientKey');
  });

  it('should initialize the SearchService', () => {
    expect(client.search).toBeInstanceOf(SearchService);
  });

  it('should initialize the FeaturedService', () => {
    expect(client.featured).toBeInstanceOf(FeaturedService);
  });

  it('should initialize the CategoryService', () => {
    expect(client.categories).toBeInstanceOf(CategoryService);
  });

  it('should initialize the SuggestionsService', () => {
    expect(client.suggestions).toBeInstanceOf(SuggestionsService);
  });

  it('should initialize the AutocompleteService', () => {
    expect(client.autocomplete).toBeInstanceOf(AutocompleteService);
  });

  it('should initialize the TrendingService', () => {
    expect(client.trending).toBeInstanceOf(TrendingService);
  });

  it('should initialize the RegisterShareService', () => {
    expect(client.registerShare).toBeInstanceOf(RegisterShareService);
  });

  it('should initialize the PostsService', () => {
    expect(client.posts).toBeInstanceOf(PostsService);
  });

  it('should pass the correct parameters to FetchWrapper', () => {
    expect(FetchWrapper).toHaveBeenCalledWith(
      'https://tenor.googleapis.com/v2',
      'testApiKey',
      'testClientKey',
    );
  });
});
