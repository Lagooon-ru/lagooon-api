import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { MediaService } from './media.service';
import { MediaEntity } from './media.entity';
import { MediasSearchDto } from './types/search.type';
import { MediasDto } from './types/medias.type';

@Resolver()
export class MediaResolver {
  constructor(private mediaService: MediaService) {}

  @Mutation(() => MediaEntity)
  async upload(): Promise<MediaEntity> {
    return this.mediaService.uploadService();
  }

  @Query(() => MediasDto)
  async medias(search: MediasSearchDto) {
    return this.mediaService.getMedias(search);
  }
}
