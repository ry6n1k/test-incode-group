import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  //@UseGuards(AuthGuard('jwt'))
  async getUsers() {
    const users = await this.userService.getListUsers();
    return users;
  }

  // @Get(':username')
  // async getBoss(@Param('username') username: string) {
  //   const boss = await this.userService.getBoss(username);
  //   return boss;
  // }
}
