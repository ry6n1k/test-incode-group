import { IsNotEmpty, Length } from 'class-validator';
import { Role } from './role.entity';
import { User } from './user.entity';

export class RegisterDTO {
  @IsNotEmpty()
  @Length(6, 16)
  username: string;

  @IsNotEmpty()
  @Length(8, 16)
  password: string;

  subordinates: User[];
  boss: number;

  @IsNotEmpty()
  role: Role;
}
