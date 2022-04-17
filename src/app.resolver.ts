import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppEntity } from './app.entity';
import { AppService } from './app.service';
import { ReleaseDto, TVersion, VersionDto } from './app.type';
import { HttpException, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from './api/auth/guards/graphql.guard';
import { UserEntity } from './core/user/user.entity';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => [AppEntity])
  async versions() {
    return this.appService.getVersionsService();
  }

  @Query(() => TVersion)
  async info(@Args('arg') dat: VersionDto) {
    return this.appService.getInfoService(dat);
  }

  @Mutation(() => TVersion)
  @UseGuards(GqlAuthGuard)
  async release(
    @CurrentUser() user: UserEntity,
    @Args('arg') release: ReleaseDto,
  ) {
    if (user.role !== 'ad' && user.role !== 'su') {
      throw new HttpException('Permission denied.', 409);
    } else {
      return this.appService.createReleaseService(release);
    }
  }
}
