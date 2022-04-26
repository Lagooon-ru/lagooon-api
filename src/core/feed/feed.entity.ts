import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../helper/base.entity';
import { MediaEntity } from '../media/media.entity';
import { UserEntity } from '../user/user.entity';

@ObjectType()
@Entity({ name: 'feeds' })
class FeedEntity extends BaseEntity {
  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinTable()
  author: UserEntity;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 2055, nullable: true })
  caption: string;

  @Field(() => [MediaEntity])
  @ManyToMany(() => MediaEntity, (photo) => photo.id)
  @JoinTable()
  photos: MediaEntity[];

  @Field(() => [UserEntity])
  @ManyToMany(() => UserEntity, (user) => user.id, { nullable: true })
  @JoinTable()
  likes: UserEntity[];

  @Field(() => [FeedCommentEntity])
  @OneToMany(() => FeedCommentEntity, (comment) => comment.feed, {
    nullable: true,
  })
  @JoinTable()
  comments: FeedCommentEntity[];

  @Field()
  @Column({ default: 0 })
  score: number;
}

@ObjectType()
@Entity({ name: 'fComment' })
class FeedCommentEntity extends BaseEntity {
  @Field(() => FeedEntity)
  @ManyToOne(() => FeedEntity, (feed) => feed.comments)
  @JoinTable()
  feed: FeedEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinTable()
  author: UserEntity;

  @Field(() => FeedCommentEntity)
  @ManyToOne(() => FeedCommentEntity, (comment) => comment.id)
  @JoinTable()
  parent: FeedCommentEntity;

  @Field(() => [UserEntity])
  @ManyToMany(() => UserEntity, (user) => user.id)
  @JoinTable()
  likes: UserEntity[];

  @Field()
  @Column({ type: 'varchar', length: 1023 })
  comment: string;
}

export { FeedEntity, FeedCommentEntity };
