import { CacheModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from 'utils';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import * as redisStore from 'cache-manager-redis-store';
// import { FeishuController } from './feishu/feishu.controller';
// import { FeishuModule } from './user/feishu/feishu.module';

const redisConfig = getConfig().REDIS_CONFIG;
console.log(redisConfig);
const cacheOptions = {
  isGlobal: true,
  store: redisStore,
  host: redisConfig.host,
  port: redisConfig.port,
  auth_pass: redisConfig.auth,
  db: 0,
};
@Module({
  imports: [
    CacheModule.register(cacheOptions),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
