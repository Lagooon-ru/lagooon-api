import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchResolver } from './search.resolver';

@Module({
  providers: [SearchService, SearchResolver]
})
export class SearchModule {}
