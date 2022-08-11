import { AppDataSource } from './data-source';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Role } from './user/role.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  /*=============================================
  =               Migration Seed                =
  =============================================*/

  await AppDataSource.initialize()
    .then(async () => {
      const role1 = new Role();
      role1.id = 1;
      role1.name = 'admin';
      await AppDataSource.manager.save(role1);

      const role2 = new Role();
      role2.id = 2;
      role2.name = 'boss';
      await AppDataSource.manager.save(role2);

      const role3 = new Role();
      role3.id = 3;
      role3.name = 'user';
      await AppDataSource.manager.save(role3);
    })
    .catch((error) => console.log(error));
  await AppDataSource.synchronize();

  await app.listen(3000);
}
bootstrap();
