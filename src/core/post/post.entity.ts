import { Entity, Column, OneToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../helper/base.entity';
import { MediaEntity } from '../media/media.entity';
import { UserEntity } from '../user/user.entity';

@ObjectType()
@Entity({ name: 'posts' })
class PostEntity extends BaseEntity {
  @Field()
  @OneToOne(() => UserEntity)
  author: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Field(() => [MediaEntity])
  @OneToMany(() => MediaEntity, (photo) => photo.id)
  photos: MediaEntity[];

  @Field()
  @Column({ default: 0 })
  rate: number;

  @Field()
  @Column({ default: 0 })
  score: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  size: string;
}

@ObjectType()
@Entity({ name: 'pComment' })
class PostComment extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: 1023 })
  comment: string;
}

export { PostEntity, PostComment };
