import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { BaseEntity } from '../../helper/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { MediaEntity } from '../media/media.entity';
import { UserEntity } from '../user/user.entity';

@ObjectType()
@Entity({ name: 'story' })
class StoryEntity extends BaseEntity {
  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinTable()
  author: UserEntity;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 4096, nullable: true })
  caption: string;

  @Field(() => MediaEntity)
  @ManyToOne(() => MediaEntity, (photo) => photo.id)
  @JoinTable()
  photo: MediaEntity;

  @Field(() => [UserEntity])
  @ManyToMany(() => UserEntity, (user) => user.id, { nullable: true })
  @JoinTable()
  likes: UserEntity[];

  @Field(() => [StoryCommentEntity])
  @OneToMany(() => StoryCommentEntity, (comment) => comment.story, {
    nullable: true,
  })
  @JoinTable()
  comments: StoryCommentEntity[];

  @Field()
  @Column({ default: 0 })
  score: number;
}

@ObjectType()
@Entity({ name: 'fComment' })
class StoryCommentEntity extends BaseEntity {
  @Field(() => StoryEntity)
  @ManyToOne(() => StoryEntity, (story) => story.comments)
  @JoinTable()
  story: StoryEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinTable()
  author: UserEntity;

  @Field(() => StoryCommentEntity)
  @ManyToOne(() => StoryCommentEntity, (comment) => comment.id)
  @JoinTable()
  parent: StoryCommentEntity;

  @Field(() => [UserEntity])
  @ManyToMany(() => UserEntity, (user) => user.id)
  @JoinTable()
  likes: UserEntity[];

  @Field()
  @Column({ type: 'varchar', length: 1023 })
  comment: string;
}

export { StoryEntity, StoryCommentEntity };
