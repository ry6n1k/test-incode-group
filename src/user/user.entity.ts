import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  ManyToOne,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
@Tree('materialized-path')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role)
  role: Role;

  @Column()
  username: string;

  @Column()
  password: string;

  @TreeChildren()
  subordinates: User[];

  @TreeParent()
  boss: User;
}
