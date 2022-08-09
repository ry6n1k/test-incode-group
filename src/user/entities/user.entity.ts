import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
//import { Role } from './../../role/role.entity';

@Entity()
@Tree('materialized-path')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // @ManyToOne(() => Role)
  // @JoinColumn({ name: 'roleId' })
  // roleId: Role;

  @TreeChildren()
  subordinates: User[];

  @TreeParent()
  boss: User;
}
