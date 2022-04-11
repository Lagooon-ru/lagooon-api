import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../helper/base.entity';
import { UserEntity } from '../user/user.entity';

@ObjectType()
@Entity({ name: 'chat' })
class ChatEntity extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: '255', nullable: false })
  title: string;

  @Field()
  @Column({ type: 'varchar', length: '255', nullable: true })
  description: string;

  @Field(() => [UserEntity])
  @ManyToMany(() => UserEntity, (member) => member.chats)
  @JoinColumn()
  members: UserEntity[];

  @Field(() => [String])
  @Column('jsonb', { nullable: true })
  content: object[];
}

export { ChatEntity };
