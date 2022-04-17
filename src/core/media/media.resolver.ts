import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaEntity } from './media.entity';
import { MediasSearchDto } from './types/search.type';
import { MediasDto } from './types/medias.type';
import { CurrentUser, GqlAuthGuard } from '../../api/auth/guards/graphql.guard';
import { UserEntity } from '../user/user.entity';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver()
export class MediaResolver {
  constructor(private mediaService: MediaService) {}

  @Mutation(() => MediaEntity)
  @UseGuards(GqlAuthGuard)
  async upload(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: Express.Multer.File,
    @CurrentUser() user: UserEntity,
  ): Promise<MediaEntity> {
    return this.mediaService.uploadService(file, user);
  }

  @Query(() => MediasDto)
  async medias(search: MediasSearchDto) {
    return this.mediaService.getMedias(search);
  }
}
