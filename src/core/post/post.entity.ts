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

  @Field((type) => [MediaEntity])
  @OneToMany((type) => MediaEntity, (photo) => photo.id)
  photos: MediaEntity[];

  @Field()
  @Column({ type: 'varchar', length: 255 })
  size: string;
}

export { PostEntity };