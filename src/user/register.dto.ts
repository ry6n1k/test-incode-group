import { Role } from 'src/role/role.entity';
import { User } from './user.entity';

export interface RegisterDTO {
  username: string;
  password: string;
  subordinates: User[];
  boss: number;
  role: Role;
}
