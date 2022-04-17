import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../../helper/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'files' })
class MediaEntity extends BaseEntity {
  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.id)
  author: UserEntity;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  asset_id: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  path: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  format: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255 })
  size: string;

  @Field({ nullable: true })
  @Column({ type: 'int' })
  height: string;

  @Field({ nullable: true })
  @Column({ type: 'int' })
  width: string;
}

export { MediaEntity };
