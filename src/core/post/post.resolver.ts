import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { PostDto } from './types/create.type';
import { PostsDto } from './types/posts.type';
import { PostsSearchDto } from './types/search.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard, CurrentUser } from 'src/api/auth/guards/graphql.guard';
import { UserEntity } from '../user/user.entity';
import { TDelete } from './types/delete.type';
import { PostGuard } from './guard/post.guard';
import { UpdatePostDto } from './types/update.type';
import { MediaService } from '../media/media.service';
import { MediaEntity } from '../media/media.entity';

@Resolver(() => PostEntity)
export class PostResolver {
  constructor(
    private postService: PostService,
    private mediaService: MediaService,
  ) {}

  @Query(() => PostsDto)
  @UseGuards(GqlAuthGuard)
  async posts(@Args('search') search: PostsSearchDto) {
    return this.postService.getPosts(search);
  }

  @Mutation(() => PostEntity)
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args('post') post: PostDto,
    @CurrentUser() author: UserEntity,
  ) {
    return this.postService.createPost(post, author);
  }

  @Mutation(() => PostEntity)
  @UseGuards(GqlAuthGuard, PostGuard)
  async updatePost(
    @Args('postId') postId: string,
    @Args('input') post: UpdatePostDto,
  ) {
    return this.postService.update(postId, post);
  }

  @Mutation(() => TDelete)
  @UseGuards(GqlAuthGuard, PostGuard)
  async deletePost(@Args('postId') postId: string) {
    return this.postService.delete(postId);
  }

  @ResolveField('photos', () => [MediaEntity])
  async photos(@Parent() post: PostEntity) {
    return this.mediaService.getByIds(post.photoIds);
  }
}
