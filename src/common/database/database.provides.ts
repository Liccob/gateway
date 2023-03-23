import { DataSource, DataSourceOptions } from 'typeorm';
import { getConfig } from '@/utils';
const path = require('path');
import { User } from '@/src/user/entities/user.mongo.entity';
const databaseType: DataSourceOptions['type'] = 'mongodb';

const { MONGODB_CONFIG } = getConfig();

const MONGODB_DATABASE_CONFIG = {
  ...MONGODB_CONFIG,
  type: databaseType,
  // 此处在windows上路径解析有问题，所以手动将user引入
  entities: [
    User,
    path.join(
      __dirname,
      `../../**/*.${MONGODB_CONFIG.entities}.entity.{ts,js}`,
    ),
  ],
};
console.log(MONGODB_DATABASE_CONFIG);
const MONGODB_DATA_SOURCE = new DataSource(MONGODB_DATABASE_CONFIG);

// 数据库注入
export const DatabaseProviders = [
  {
    provide: 'MONGODB_DATA_SOURCE',
    useFactory: async () => {
      await MONGODB_DATA_SOURCE.initialize();
      return MONGODB_DATA_SOURCE;
    },
  },
];
