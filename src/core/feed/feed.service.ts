import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { MediaService } from '../media/media.service';
import { FeedCommentEntity, FeedEntity } from './feed.entity';
import { UserEntity } from '../user/user.entity';
import { TFeedLike, TFeeds } from './types/object';
import {
  FeedAddCommentDto,
  FeedCreateDto,
  FeedsSearchDto,
} from './types/input';
import { PaginationDto } from 'src/helper/pagination.dto';
import { FeedRepository } from './feed.repository';

@Injectable()
export class FeedService {
  constructor(
    private feedRepository: FeedRepository,
    @InjectRepository(FeedCommentEntity)
    private feedCommentRepository: Repository<FeedCommentEntity>,
    private readonly mediaService: MediaService,
  ) {}

  //SEARCH
  async getFeedsService(search: FeedsSearchDto): Promise<TFeeds> {
    const limit = search.pagination?.limit || 10;
    const page = search.pagination?.page || 0;
    const keyword = search.keyword || '';
    const author = search.author || '';
    const where: FindManyOptions<UserEntity>['where'] = [];
    if (!!keyword) {
      where.push({ caption: Like(`%${keyword}%`) });
    }

    if (!!author) {
      where.push({ author: author });
    }

    const [item, count] = await this.feedRepository.findAndCount({
      where,
      relations: ['photos', 'author', 'likes', 'comments'],
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

  //CREATE
  async createFeedService(
    feed: FeedCreateDto,
    author: UserEntity,
  ): Promise<FeedEntity> {
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

      await this.feedRepository.save(newPost);
      // await this.searchService.indexUser(newUser);

      return newPost;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  //LIKE
  async likeFeedService(
    feed: FeedEntity,
    author: UserEntity,
    like: boolean,
  ): Promise<TFeedLike> {
    if (like) {
      if (!!feed.likes) {
        feed.likes.push(author);
      } else {
        feed.likes = [author];
      }
    } else {
      if (!!feed.likes) {
        feed.likes = feed.likes.filter((l) => l.id !== author.id);
      }
    }
    await this.feedRepository.save(feed);
    return { status: like };
  }

  //COMMENT
  async createCommentService(
    comment: FeedAddCommentDto,
    author: UserEntity,
  ): Promise<FeedCommentEntity> {
    const newComment = await this.feedCommentRepository.create();
    if (!!comment.parentId) {
      const parent = await this.feedCommentRepository.findOne(comment.parentId);
      if (!!parent) {
        newComment.parent = parent;
      } else {
        throw new BadRequestException('invalid parent id');
      }
    }

    const feed = await this.feedRepository.findOne(comment.feedId);

    if (!!feed) {
      newComment.feed = feed;
    } else {
      throw new BadRequestException('invalid feed id');
    }

    newComment.author = author;
    newComment.comment = comment.content;
    await this.feedCommentRepository.save(newComment);
    return newComment;
  }

  async feedGetCommentsService(feed): Promise<FeedCommentEntity[]> {
    return this.feedCommentRepository.find({
      where: { feed: feed.feedId },
      order: { createdAt: 'DESC' },
      relations: ['author', 'author.avatar', 'likes'],
    });
  }

  //VALIDATE
  async validate(data: any): Promise<any> {
    try {
      const fd = await this.feedRepository.findOne({
        where: { ...data },
        relations: ['likes', 'comments'],
      });
      if (!!fd) {
        return fd;
      } else {
        return null;
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getOwn(
    params: PaginationDto,
    author: UserEntity,
  ): Promise<FeedEntity[]> {
    const s = await this.feedRepository.getOwn(params, author);
    return s;
  }
}
