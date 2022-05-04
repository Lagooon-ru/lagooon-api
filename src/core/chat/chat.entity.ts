import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../helper/base.entity';
import { UserEntity } from '../user/user.entity';
import { FeedCommentEntity } from '../feed/feed.entity';

export enum ChatFormat {
  DIRECT = 'direct',
  GROUP = 'group',
}

@ObjectType()
@Entity({ name: 'chats' })
class ChatEntity extends BaseEntity {
  @Field()
  @Column({ type: 'enum', enum: ChatFormat, default: ChatFormat.DIRECT })
  type: ChatFormat;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: '255', nullable: true })
  title: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: '255', nullable: true })
  description: string;

  @Field(() => [UserEntity])
  @ManyToMany(() => UserEntity, (member) => member.id)
  @JoinTable()
  members: UserEntity[];

  @Field(() => [MessageEntity], { nullable: true })
  @OneToMany(() => MessageEntity, (message) => message.chat, {
    nullable: true,
  })
  @JoinTable()
  messages: FeedCommentEntity[];
}

@ObjectType()
@Entity({ name: 'chat' })
class MessageEntity extends BaseEntity {
  @Field(() => ChatEntity)
  @ManyToOne(() => ChatEntity, (chat) => chat.id)
  chat: ChatEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (member) => member.id)
  @JoinTable()
  sender: UserEntity;

  @Field()
  @Column({ type: 'text' })
  message: string;
}

export { ChatEntity, MessageEntity };
