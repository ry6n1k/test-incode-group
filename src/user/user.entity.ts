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

  @ManyToOne(() => Role)
  //@JoinColumn({ name: 'roleId' })
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
