import { Entity, Column, OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../helper/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { MediaEntity } from '../media/media.entity';
import { UserEntity } from '../user/user.entity';

@ObjectType()
@Entity({ name: 'story' })
class StoryEntity extends BaseEntity {
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

  @Field(() => [String])
  @Column('text', { array: true })
  tags: string;

  @Field(() => [MediaEntity])
  @OneToMany(() => MediaEntity, (photo) => photo.id)
  photos: MediaEntity[];

  @Field()
  @Column({ type: 'varchar', length: 255 })
  size: string;
}

export { StoryEntity };
