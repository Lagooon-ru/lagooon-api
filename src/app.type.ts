import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { AppEntity } from './app.entity';

@InputType()
class VersionDto {
  @IsString()
  @Field()
  version: string;
}

@InputType()
class ReleaseDto {
  @IsString()
  @Field()
  version: string;

  @IsString()
  @Field({ nullable: true })
  image: string;

  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field({ nullable: true })
  description: string;
}

@ObjectType()
class TVersion extends AppEntity {
  @IsString()
  @Field()
  img: string;
}

export { VersionDto, TVersion, ReleaseDto };
