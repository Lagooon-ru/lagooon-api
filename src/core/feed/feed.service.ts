import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { MediaService } from '../media/media.service';
import { FeedEntity } from './feed.entity';
import { UserEntity } from '../user/user.entity';
import { FeedsSearchDto } from './types/search.type';
import { TFeeds } from './types/feeds.type';
import { FeedDto } from './types/create.type';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedEntity)
    private feedRepository: Repository<FeedEntity>,
    private readonly mediaService: MediaService,
  ) {}

  async getFeeds(search: FeedsSearchDto): Promise<TFeeds> {
    console.log(search);
    const limit = search.pagination?.limit || 10;
    const page = search.pagination?.page || 0;
    const keyword = search.keyword || '';
    const where: FindManyOptions<UserEntity>['where'] = [];
    if (!!keyword) {
      where.push({ caption: Like(`%${keyword}%`) });
    }

    const [item, count] = await this.feedRepository.findAndCount({
      where,
      relations: ['photos', 'author', 'likes'],
      order: {
        createdAt: 'DESC',
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

  async createFeed(feed: FeedDto, author: UserEntity): Promise<FeedEntity> {
    const { caption, photos } = feed;

    if (photos.length === 0) {
      throw new HttpException('Add post', HttpStatus.BAD_REQUEST);
    }

    try {
      const newPost = await this.feedRepository.create();
      const fids = await Promise.all(
        photos.map(async (photo) => {
          const p = await this.mediaService.getById(photo);
          if (!!p) {
            return p;
          } else {
            throw new HttpException('invalid media', HttpStatus.BAD_REQUEST);
          }
        }),
      );

      newPost.caption = caption;
      newPost.photos = fids;
      newPost.author = author;
      console.log(newPost);

      await this.feedRepository.save(newPost);
      // await this.searchService.indexUser(newUser);

      return newPost;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
