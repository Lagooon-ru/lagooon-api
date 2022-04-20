import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { PostsSearchDto } from './types/search.type';
import { PostsDto } from './types/posts.type';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async getPosts(search: PostsSearchDto): Promise<PostsDto> {
    const limit = search.pagination?.limit || 10;
    const page = search.pagination?.page || 0;
    const keyword = search.keyword || '';
    const where: FindManyOptions<UserEntity>['where'] = [];
    if (!!keyword) {
      where.push({ title: Like(`%${keyword}%`) });
      where.push({ description: Like(`%${keyword}%`) });
    }

    const [item, count] = await this.postRepository.findAndCount({
      where,
      order: {
        id: 'ASC',
      },
      skip: page * limit,
      take: limit,
    });

    return {
      data: item,
      pagination: {
        limit: limit,
        page: page,
        total: count,
      },
    };
  }
}
