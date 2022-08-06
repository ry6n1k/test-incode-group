import { User } from './user.entity';
import { DataSource } from 'typeorm';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getTreeRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
