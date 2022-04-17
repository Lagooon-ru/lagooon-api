import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './helper/base.entity';

@ObjectType()
@Entity({ name: 'app' })
class AppEntity extends BaseEntity {
  @Field()
  @Column({ type: Number, nullable: false })
  name: number;

  @Field()
  @Column({ type: Boolean, default: true })
  isActual: boolean;

  @Field()
  @Column({ type: String, length: 255, nullable: true })
  title: string;

  @Field()
  @Column({ type: String, length: 1023, nullable: true })
  description: string;
}

export { AppEntity };
