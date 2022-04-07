import { Entity, Column, OneToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../../helper/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'files' })
class MediaEntity extends BaseEntity {
  @Field()
  @OneToOne(() => UserEntity)
  author: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  path: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  size: string;
}

export { MediaEntity };
