import { SearchDto } from '../../../helper/search.dto';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
class StoriesDto extends SearchDto {}

@InputType()
class StoryDto {
  @Field()
  id: string;
}

@InputType()
class StoriesOfUserDto {
  @Field()
  id: string;
}

@InputType()
class StoryGetCommentsDto {
  @Field()
  id: string;
}

@InputType()
class StoryCreateDto {
  @Field({ nullable: true })
  caption: string;

  @Field()
  @IsNotEmpty()
  photo: string;
}

@InputType()
class StoryUpdateDto {
  @IsString()
  @Field()
  id: string;

  @Field({ nullable: true })
  caption: string;

  @Field({ nullable: true })
  photo: string;
}

@InputType()
class StoryLikeDto {
  @IsString()
  @Field()
  id: string;

  @Field()
  action: boolean;
}

@InputType()
class StoryAddCommentDto {
  @Field({ nullable: true })
  parentId: string;

  @Field()
  storyId: string;

  @Field()
  content: string;
}

export {
  StoriesDto,
  StoryDto,
  StoriesOfUserDto,
  StoryCreateDto,
  StoryUpdateDto,
  StoryLikeDto,
  StoryAddCommentDto,
  StoryGetCommentsDto,
};
