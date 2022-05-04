import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { FeedEntity } from './feed.entity';
import { PaginationDto } from 'src/helper/pagination.dto';

@EntityRepository(FeedEntity)
export class FeedRepository extends Repository<FeedEntity> {
  async getAll(params: PaginationDto): Promise<FeedEntity[]> {
    return await this.createQueryBuilder('feeds')
      .leftJoinAndSelect('feeds.author', 'author')
      .leftJoinAndSelect('feeds.photos', 'photos')
      .leftJoinAndSelect('feeds.comments', 'comments')
      .leftJoinAndSelect('feeds.likes', 'likes')
      .take(params.limit || 10)
      .skip((params.page - 1) * params.limit || 0)
      .orderBy('feeds.createdAt', 'DESC')
      .getMany();
  }

  async getOwn(
    params: PaginationDto,
    author: UserEntity,
  ): Promise<FeedEntity[]> {
    return await this.createQueryBuilder('feeds')
      .leftJoin('feeds.author', 'author')
      .leftJoinAndSelect('feeds.photos', 'photos')
      .leftJoinAndSelect('feeds.comments', 'comments')
      .leftJoinAndSelect('feeds.likes', 'likes')
      .where('author.id = :author', { author: author.id })
      .take(params.limit || 10)
      .skip((params.page - 1) * params.limit || 0)
      .getMany();
  }
}
