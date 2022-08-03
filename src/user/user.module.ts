import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { userProviders } from './entities/user.provider';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService],
})
export class UserModule {}
