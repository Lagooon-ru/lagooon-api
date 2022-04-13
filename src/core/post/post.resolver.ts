import { Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostsDto } from './types/posts.type';
import { PostsSearchDto } from './types/search.type';

@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => PostsDto)
  async posts(search: PostsSearchDto) {
    return this.postService.getPosts(search);
  }
}
