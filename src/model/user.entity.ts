import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user' })
class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  vToken: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  rToken: string;
}

export { User };
