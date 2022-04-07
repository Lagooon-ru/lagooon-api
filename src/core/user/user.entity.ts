import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../helper/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'user' })
class UserEntity extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Field()
  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Field()
  @Column({ type: 'varchar', length: 255, nullable: true })
  vToken: string;

  @Field()
  @Column({ type: 'varchar', length: 255, nullable: true })
  rToken: string;
}

export { UserEntity };
