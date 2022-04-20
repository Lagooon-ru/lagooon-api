import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { MediaModule } from '../media/media.module';
import { SearchModule } from '../../api/search/search.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MediaModule, SearchModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
