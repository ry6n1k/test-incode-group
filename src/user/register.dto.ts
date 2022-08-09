import { User } from './entities/user.entity';

export interface RegisterDTO {
  username: string;
  password: string;
  subordinates: User[];
  boss: number;
}
