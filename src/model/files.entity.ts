import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'files' })
class Asset extends BaseEntity {
  @OneToOne(() => User)
  author: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  path: string;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'varchar', length: 255 })
  size: string;
}

export { Asset };
