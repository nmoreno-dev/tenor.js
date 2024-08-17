// src/api/TenorClient.ts

import { FetchWrapper } from '../utils/FetchWrapper';
import { SearchService } from './SearchService';
import { FeaturedService } from './FeaturedService';
import { SuggestionsService } from './SuggestionsService';
import { AutocompleteService } from './AutocompleteService';
import { TrendingService } from './TrendingService';
import { RegisterShareService } from './RegisterShareService';
import { PostsService } from './PostsService';
import { CategoryService } from './CategoryService';

export class TenorClient {
  public search: SearchService;
  public featured: FeaturedService;
  public categories: CategoryService;
  public suggestions: SuggestionsService;
  public autocomplete: AutocompleteService;
  public trending: TrendingService;
  public registerShare: RegisterShareService;
  public posts: PostsService;

  constructor(apiKey: string, clientKey?: string) {
    const baseUrl = 'https://tenor.googleapis.com/v2';
    const fetchWrapper = new FetchWrapper(baseUrl, apiKey, clientKey);

    this.search = new SearchService(fetchWrapper);
    this.featured = new FeaturedService(fetchWrapper);
    this.categories = new CategoryService(fetchWrapper);
    this.suggestions = new SuggestionsService(fetchWrapper);
    this.autocomplete = new AutocompleteService(fetchWrapper);
    this.trending = new TrendingService(fetchWrapper);
    this.registerShare = new RegisterShareService(fetchWrapper);
    this.posts = new PostsService(fetchWrapper);
  }
}
