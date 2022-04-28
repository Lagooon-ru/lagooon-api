import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedEntity } from '../feed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedGuard implements CanActivate {
  constructor(
    @InjectRepository(FeedEntity)
    private feedRepository: Repository<FeedEntity>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { feedId } = ctx.getArgs();
    const { user } = ctx.getContext().req;

    if (!feedId) {
      throw new BadRequestException();
    }
    const feed = await this.feedRepository.findOne({
      where: { id: feedId, author: user },
    });
    if (!feed) {
      throw new BadRequestException('Пост не существует');
    }
    return true;
  }
}
