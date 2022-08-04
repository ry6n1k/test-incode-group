import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Payload } from 'src/auth/payload';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDTO } from './register.dto';
import { LoginDTO } from 'src/auth/login.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(registerDTO: RegisterDTO): Promise<User> {
    const { username } = registerDTO;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = this.userRepository.create(registerDTO);
    await this.userRepository.save(createdUser);
    return createdUser;
  }

  async findByPayload(payload: Payload) {
    const { username } = payload;
    return this.userRepository.findOne({ where: { username } });
  }

  async findByUsername(loginDTO: LoginDTO) {
    const { username, password } = loginDTO;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new HttpException('user does not exists', HttpStatus.BAD_REQUEST);
    }
    if (password === user.password) {
      return user;
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }
}
