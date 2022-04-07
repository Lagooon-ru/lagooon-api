import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUsersService(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getProfileService(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  async getUserByAttrService(attr: any): Promise<UserEntity> {
    return this.userRepository.findOne({ ...attr });
  }

  async createUserService(user: any): Promise<UserEntity> {
    const { name, email, password } = user;
    console.log(password);
    try {
      const newUser = await this.userRepository.create();
      newUser.name = name;
      newUser.email = email;
      newUser.password = password;
      await this.userRepository.save(newUser);
      return newUser;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUserService(id: string, data: any) {
    return this.userRepository.update(id, data);
  }
}
