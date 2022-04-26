import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../helper/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'tilda' })
class TildaEntity extends BaseEntity {
  @Field()
  @Column({ type: 'varchar' })
  tildaId: string;

  @Field()
  @Column({ type: 'varchar' })
  projectid: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  descr: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  img: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  featureimg: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  alias: string;

  @Field()
  @Column({ type: 'varchar' })
  date: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  sort: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  published: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  fb_title: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  fb_descr: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  fb_img: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  filename: string;

  @Field()
  @Column({ type: 'text' })
  html: string;
}

export { TildaEntity };
