import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsersService(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getProfileService(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async getUserByAttrService(attr: any): Promise<User> {
    return this.userRepository.findOne({ ...attr });
  }

  async createUserService(user: any): Promise<User> {
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
