import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  getUsers() {
    return this.userService.getListUsers();
  }

  @Get(':id')
  getBoss(@Param('id') id: number) {
    return this.userService.getBoss(id);
  }
}
