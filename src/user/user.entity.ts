import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Role } from '../role/role.entity';

@Entity()
@Tree('materialized-path')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @TreeChildren()
  subordinates: User[];

  @TreeParent()
  boss: User;
}
