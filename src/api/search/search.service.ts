import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { UserEntity } from '../../core/user/user.entity';
import { Script } from '@elastic/elasticsearch/lib/api/typesWithBodyKey';

@Injectable()
export class SearchService {
  index = 'users';
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexUser(user: UserEntity) {
    return this.elasticsearchService.index<any>({
      index: this.index,
      body: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    });
  }

  async searchUser(text: string) {
    const { hits } = await this.elasticsearchService.search<any>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['username', 'name'],
          },
        },
      },
    });
    const h = hits.hits;
    return h.map((item) => item._source);
  }

  async updateUser(user: UserEntity) {
    const newBody: any = {
      id: user.id,
      username: user.username,
      name: user.name,
    };

    const script: Script = Object.entries(newBody).reduce(
      (result, [key, value]) => {
        return `${result} ctx._source.${key}='${value}';`;
      },
      '',
    );

    return this.elasticsearchService.updateByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: user.id,
          },
        },
        script: script,
      },
    });
  }
}
