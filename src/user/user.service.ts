import { AppDataSource } from '../data-source';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Payload } from 'src/auth/payload';
import { RegisterDTO } from './register.dto';
import { LoginDTO } from 'src/auth/login.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  userRepository = AppDataSource.getTreeRepository(User);

  /*=============================================
  =            Authentication User              =
  =============================================*/

  async create(registerDTO: RegisterDTO) {
    const { username } = registerDTO;
    const user = await this.userRepository.findOneBy({
      username: username,
    });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const boss = await this.userRepository.findOneBy({ id: registerDTO.boss });
    const newUser = new User();
    newUser.username = registerDTO.username;
    newUser.password = registerDTO.password;
    newUser.role = registerDTO.role;
    newUser.boss = boss;
    return await AppDataSource.manager.save(newUser);
  }

  async findByPayload(payload: Payload) {
    const { username } = payload;
    return this.userRepository.findOne({ where: { username } });
  }

  async findByUsername(loginDTO: LoginDTO) {
    const { username, password } = loginDTO;
    const user = await this.userRepository.findOne({ where: { username } });
    console.log(user);
    if (!user) {
      throw new HttpException('user does not exists', HttpStatus.BAD_REQUEST);
    }
    if (password === user.password) {
      return user;
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  /*=============================================
  =            Return list of Users             =
  =============================================*/

  async getListUsers(): Promise<User[]> {
    const users = await AppDataSource.manager
      .getTreeRepository(User)
      .findTrees({
        relations: ['role'],
      });
    return users;
  }

  async getBoss(id: number): Promise<User[]> {
    const boss = await this.userRepository.findOneBy({ id: id });
    const users = await this.userRepository.findDescendants(boss, {
      relations: ['role'],
    });
    return users;
  }
}
