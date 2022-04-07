import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../../core/user/user.entity';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export type TLogin = {
  user: User;
  access_token: string;
};
