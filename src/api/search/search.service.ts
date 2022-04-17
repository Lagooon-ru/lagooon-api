import { Injectable } from '@nestjs/common';
import { SearchDto, TSearch } from './types/search.type';

@Injectable()
export class SearchService {
  async search(s: SearchDto): Promise<TSearch> {
    console.log(s);
    return {
      results: [],
      pagination: {
        ...s.pagination,
        total: 10,
      },
    };
  }
}
