import { Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {}
}
