import { Injectable } from '@nestjs/common';
import { UserSearchBody, UserSearchResult } from './types/search.type';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { UserEntity } from '../../core/user/user.entity';

@Injectable()
export class SearchService {
  index = 'user';
  constructor(private readonly elsService: ElasticsearchService) {}

  async indexUser(user: UserEntity) {
    return this.elsService.index<UserSearchResult, UserSearchBody>({
      index: this.index,
      body: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    });
  }

  async search(text: string): Promise<UserSearchResult> {
    const { hits } = await this.elsService.search<UserSearchResult>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['name', 'username'],
          },
        },
      },
    });
    const h = hits.hits;
    const count = hits.total?.value || 0;
    const results = h.map((item) => item._source);
    return {
      total: count,
      results,
    };
  }
}
