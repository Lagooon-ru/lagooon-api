import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../helper/base.entity';
import { MediaEntity } from '../media/media.entity';
import { UserEntity } from '../user/user.entity';

@ObjectType()
@Entity({ name: 'posts' })
class PostEntity extends BaseEntity {
  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinTable()
  author: UserEntity;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Field(() => [MediaEntity])
  @OneToMany(() => MediaEntity, (photo) => photo.id)
  photos: MediaEntity[];

  @Field(() => [UserEntity])
  @ManyToMany(() => UserEntity, (user) => user.id)
  likes: UserEntity[];

  @Field({ nullable: true })
  @Column({ default: 0 })
  score: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  size: string;

  @Field(() => [PostCommentEntity])
  @OneToMany(() => PostCommentEntity, (comment) => comment.id)
  comments: PostCommentEntity[];
}

@ObjectType()
@Entity({ name: 'pComment' })
class PostCommentEntity extends BaseEntity {
  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.id)
  author: UserEntity;

  @Field(() => PostCommentEntity)
  @ManyToOne(() => PostCommentEntity, (comment) => comment.id)
  parent: PostCommentEntity;

  @Field(() => [UserEntity])
  @OneToMany(() => UserEntity, (user) => user.id)
  likes: UserEntity[];

  @Field()
  @Column({ type: 'varchar', length: 1023 })
  comment: string;
}

export { PostEntity, PostCommentEntity };
