import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../helper/base.entity';
import { UserEntity } from '../user/user.entity';

export enum ChatFormat {
  DIRECT = 'direct',
  GROUP = 'group',
}

@ObjectType()
@Entity({ name: 'chat' })
class ChatEntity extends BaseEntity {
  @Field()
  @Column({ type: 'enum', enum: ChatFormat, default: ChatFormat.DIRECT })
  type: ChatFormat;

  @Field()
  @Column({ type: 'varchar', length: '255', nullable: false })
  title: string;

  @Field()
  @Column({ type: 'varchar', length: '255', nullable: true })
  description: string;

  @Field(() => [UserEntity])
  @ManyToMany(() => UserEntity, (member) => member.chats)
  @JoinTable()
  members: UserEntity[];

  @Field(() => [String])
  @Column('jsonb', { nullable: true })
  content: object[];
}

export { ChatEntity };
