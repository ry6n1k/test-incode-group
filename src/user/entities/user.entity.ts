import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  JoinColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Role } from './../../role/role.entity';

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
  roleId: Role;

  // @ManyToOne(() => User)
  // @JoinColumn({name: "bossId"})
  // bossId: User;

  @TreeChildren()
  children: User[];

  @TreeParent()
  parent: User;
}
