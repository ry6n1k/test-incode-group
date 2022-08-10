import { DataSource } from 'typeorm';
import { Role } from 'src/user/role.entity';
import { User } from 'src/user/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'admin',
  password: '123456',
  database: 'test-incode-group',
  synchronize: true,
  logging: false,
  entities: [User, Role],
});

AppDataSource.initialize();
