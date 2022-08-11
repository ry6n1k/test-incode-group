import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDTO } from 'src/user/register.dto';
import { LoginDTO } from './login.dto';
import { UpdateDTO } from '../user/update.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const user = await this.userService.create(registerDTO);
    const payload = { username: user.username };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.findByUsername(loginDTO);
    const payload = { username: user.username };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async auth(@Request() req) {
    return await this.userService.getBoss(req.user.id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: number, @Body() updateDTO: UpdateDTO) {
    return await this.userService.updateBoss(id, updateDTO);
  }
}
