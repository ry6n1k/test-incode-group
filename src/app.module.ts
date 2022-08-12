import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AppController],
})
export class AppModule {}
