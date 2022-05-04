import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './helper/base.entity';
import { MediaEntity } from './core/media/media.entity';

@ObjectType()
@Entity({ name: 'app' })
class AppEntity extends BaseEntity {
  @Field()
  @Column({ type: String, length: 31, unique: true, nullable: false })
  version: string;

  @Field(() => MediaEntity)
  @ManyToOne(() => MediaEntity, (media) => media.id, { nullable: true })
  image: MediaEntity;

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
