import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { TUsers } from './types/users.type';
import { UsersSearchDto } from './types/search.type';
import { MediaService } from '../media/media.service';
import { SearchService } from '../../api/search/search.service';
import { TFollow } from './types/follow.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly mediaService: MediaService,
    private readonly searchService: SearchService,
  ) {}

  async getAllUserService(): Promise<UserEntity[]> {
    return this.userRepository.find({
      relations: ['follow', 'avatar'],
    });
  }

  async getUsersService(search: UsersSearchDto): Promise<TUsers> {
    const limit = search.pagination?.limit || 10;
    const page = search.pagination?.page || 0;
    const keyword = search.keyword || '';
    const where: FindManyOptions<UserEntity>['where'] = [];
    if (!!keyword) {
      where.push({ username: ILike(`%${keyword}%`) });
      where.push({ name: ILike(`%${keyword}%`) });
      where.push({ email: ILike(`%${keyword}%`) });
    }

    console.log(where);

    const [item, count] = await this.userRepository.findAndCount({
      where,
      relations: ['follow', 'avatar', 'follow.avatar'],
      order: {
        id: 'ASC',
      },
      skip: page * limit,
      take: limit,
    });

    return {
      data: item,
      pagination: {
        limit: limit,
        page: page,
        total: count,
      },
    };
  }

  async getProfileService(id: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: ['follow', 'avatar', 'follow.avatar'],
    });
  }

  async getUserByAttrService(attr: any): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { ...attr },
      relations: ['follow', 'follow.avatar', 'avatar'],
    });
  }

  async createUserService(user: any): Promise<UserEntity> {
    const { username, avatar, bio, name, email, password, vToken } = user;

    try {
      const newUser = await this.userRepository.create();
      newUser.name = name;
      newUser.username = username;
      newUser.bio = bio;
      newUser.email = email;
      newUser.password = password;
      newUser.vToken = vToken;

      if (!!avatar) {
        const image = await this.mediaService.getById(avatar);
        if (!!image) {
          newUser.avatar = image;
        }
      }

      await this.userRepository.save(newUser);
      // await this.searchService.indexUser(newUser);
      return newUser;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUserService(id: string, data: any) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['follow', 'avatar', 'follow.avatar'],
    });

    if (!!data.email) {
      data.emailConfirmed = false;
    }

    if (!!data.phone) {
      data.phoneConfirmed = false;
    }

    if (!!data.avatar) {
      const image = await this.mediaService.getById(data.avatar);
      if (!!image) {
        data.avatar = image;
      }
    }

    return this.userRepository
      .save({
        ...user,
        ...data,
      })
      .then((res) => {
        return { ...res, password: undefined };
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(err, 500);
      });
  }

  //FOLLOWING
  async followService(
    user: UserEntity,
    follower: UserEntity,
    following: boolean,
  ): Promise<TFollow> {
    if (following) {
      if (!!follower.follow) {
        follower.follow.push(user);
      } else {
        follower.follow = [user];
      }
    } else {
    }

    await this.userRepository.save(follower);
    return {
      status: following,
    };
  }
}
