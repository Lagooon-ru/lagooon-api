import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from '../../../core/user/user.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;
}

@ObjectType()
export class TLogin {
  @Field()
  user: UserEntity;

  @Field()
  access_token: string;
}

@ObjectType()
export class TForget {
  @Field()
  status: string;
}
