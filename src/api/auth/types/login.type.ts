import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from '../../../core/user/user.entity';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export type TLogin = {
  user: UserEntity;
  access_token: string;
};
