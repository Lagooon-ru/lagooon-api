import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ResetPassDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  token: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;
}
