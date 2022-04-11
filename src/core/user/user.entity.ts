import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../helper/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { MediaEntity } from '../media/media.entity';
import { ChatEntity } from '../chat/chat.entity';

@ObjectType()
@Entity({ name: 'user' })
class UserEntity extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Field()
  @Column({ type: 'boolean', default: false })
  emailConfirmed: boolean;

  @Field()
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

  @Field(() => [MediaEntity])
  @OneToMany(() => MediaEntity, (media) => media.author)
  medias: MediaEntity[];

  @Field(() => [ChatEntity], { nullable: true })
  @ManyToMany(() => ChatEntity, (member) => member.members, { nullable: true })
  @JoinTable()
  chats: ChatEntity[];

  @Field()
  @Column({ type: 'varchar', length: 255, nullable: true })
  vToken: string;

  @Field()
  @Column({ type: 'varchar', length: 255, nullable: true })
  rToken: string;
}

export { UserEntity };
