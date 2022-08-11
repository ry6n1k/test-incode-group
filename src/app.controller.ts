import { UserService } from 'src/user/user.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private userService: UserService) {}

  @Get()
  async list() {
    return await this.userService.list();
  }
}
