import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterDto {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  avatar: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @Field({ nullable: true })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Field({ nullable: false })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  @Field({ nullable: false })
  password: string;
}

@InputType()
export class EmailConformActionDto {
  @Field()
  token: string;
}
