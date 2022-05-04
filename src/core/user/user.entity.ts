import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../helper/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { MediaEntity } from '../media/media.entity';
import { ChatEntity } from '../chat/chat.entity';

export enum RoleFormat {
  CONSUMER = 'cu',
  VIP = 'vip',
  COMPANY = 'cp',
  GROUP = 'gp',
  ADMIN = 'ad',
  SUPERUSER = 'su',
  SUPPORT = 'sp',
}

@ObjectType()
@Entity({ name: 'user' })
class UserEntity extends BaseEntity {
  @Field()
  @Column({ type: 'enum', enum: RoleFormat, default: RoleFormat.CONSUMER })
  role: RoleFormat;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 63, nullable: true })
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 63, unique: true, nullable: true })
  username: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 127, nullable: true })
  bio: string;

  @Field()
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Field()
  @Column({ type: 'boolean', default: false })
  emailConfirmed: boolean;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  phone: string;

  @Field()
  @Column({ type: 'boolean', default: false })
  phoneConfirmed: boolean;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Field()
  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Field(() => MediaEntity, { nullable: true })
  @ManyToOne(() => MediaEntity, (media) => media.id)
  avatar: MediaEntity;

  @Field(() => [UserEntity], { nullable: true })
  @ManyToMany(() => UserEntity, (member) => member.id, { nullable: true })
  @JoinTable()
  follow: UserEntity[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  vToken: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  rToken: string;
}

export { UserEntity };
