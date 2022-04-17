import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UsersDto } from './types/users.type';
import { UsersSearchDto } from './types/search.type';
import { MediaService } from '../media/media.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly mediaService: MediaService,
  ) {}

  async getUsersService(search: UsersSearchDto): Promise<UsersDto> {
    const data = await this.userRepository.find();
    const total = await this.userRepository.count();
    return {
      data: data,
      pagination: {
        ...search.pagination,
        total: total,
      },
    };
  }

  async getProfileService(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  async getUserByAttrService(attr: any): Promise<UserEntity> {
    return this.userRepository.findOne({ ...attr });
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
      return newUser;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUserService(id: string, data: any) {
    const user = await this.userRepository.findOne(id);

    if (!!data.email) {
      data.emailConfirmed = false;
    }

    if (!!data.phone) {
      data.phoneConfirmed = false;
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
}
