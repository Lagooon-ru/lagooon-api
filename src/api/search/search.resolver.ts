import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchService } from './search.service';
import { SearchDto, TSearch } from './types/search.type';

@Resolver()
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => TSearch)
  async search(@Args('arg') search: SearchDto) {
    return this.searchService.search(search);
  }
}
