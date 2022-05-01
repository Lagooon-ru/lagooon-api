import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { PostsSearchDto } from './types/search.type';
import { PostsDto } from './types/posts.type';
import { UserEntity } from '../user/user.entity';
import { MediaService } from '../media/media.service';
import { PostDto } from './types/create.type';
import { UpdatePostDto } from './types/update.type';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    private readonly mediaService: MediaService,
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

  getUserPosts(author: UserEntity) {
    return this.postRepository.find({
      where: { author },
    });
  }

  async createPost(post: PostDto, author: UserEntity): Promise<PostEntity> {
    const { title, description, photos } = post;

    if (photos.length === 0) {
      throw new HttpException('Add post', HttpStatus.BAD_REQUEST);
    }

    try {
      const newPost = await this.postRepository.create();
      const pIds = [];
      photos.map((photo) => {
        const p = this.mediaService.getById(photo);
        pIds.push(p);
      });

      newPost.title = title;
      newPost.description = description;
      // newPost.photos = pIds;
      newPost.author = author;
      newPost.photoIds = photos;
      await this.postRepository.save(newPost);
      // await this.searchService.indexUser(newUser);
      return newPost;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, post: UpdatePostDto): Promise<PostEntity> {
    try {
      await this.postRepository.update(id, { ...post });
      return await this.postRepository.findOne(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<any> {
    try {
      await this.postRepository.delete(id);
      return { status: true };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
