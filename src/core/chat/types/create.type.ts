import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { ChatFormat } from '../chat.entity';
import { UserEntity } from '../../user/user.entity';

@InputType()
export class CreateChatDto {
  @Field()
  type: ChatFormat;

  @Field(() => [ID])
  members: UserEntity[];

  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field()
  description: string;
}

@InputType()
export class GetChatDto {
  @Field(() => String)
  receiverId: string;
}
