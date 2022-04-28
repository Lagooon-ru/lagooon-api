import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../post.entity';

@Injectable()
export class PostGuard implements CanActivate {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { postId } = ctx.getArgs();
    const { user } = ctx.getContext().req;

    if (!postId) {
      throw new BadRequestException();
    }
    const feed = await this.postRepository.findOne({
      where: { id: postId, author: user },
    });
    if (!feed) {
      throw new BadRequestException('Пост не существует');
    }
    return true;
  }
}
