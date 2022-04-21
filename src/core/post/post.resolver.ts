import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { PostDto } from './types/create.type';
import { PostsDto } from './types/posts.type';
import { PostsSearchDto } from './types/search.type';

@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => PostsDto)
  async posts(@Args('search') search: PostsSearchDto) {
    return this.postService.getPosts(search);
  }

  @Mutation(() => PostEntity)
  async createPost(@Args('post') post: PostDto) {
    return this.postService.createPost(post);
  }
}
