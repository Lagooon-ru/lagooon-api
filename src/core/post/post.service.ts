import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { PostsSearchDto } from './types/search.type';
import { PostsDto } from './types/posts.type';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async getPosts(search: PostsSearchDto): Promise<PostsDto> {
    const data = await this.postRepository.find();
    const total = await this.postRepository.count();

    return {
      data: data,
      pagination: {
        ...search.pagination,
        total: total,
      },
    };
  }
}
