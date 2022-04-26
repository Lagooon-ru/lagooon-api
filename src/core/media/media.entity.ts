import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../../helper/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'files' })
class MediaEntity extends BaseEntity {
  @Field(() => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: true })
  author: UserEntity;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  asset_id: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  public_id: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  path: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  format: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  size: string;

  @Field({ nullable: true })
  @Column({ type: 'int', nullable: true })
  height: string;

  @Field({ nullable: true })
  @Column({ type: 'int', nullable: true })
  width: string;
}

export { MediaEntity };
