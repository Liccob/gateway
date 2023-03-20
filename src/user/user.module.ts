import { UserProviders } from './user.providers';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import DatabaseModule from '../common/database/database.module';
import { FeishuModule } from './feishu/feishu.module';

@Module({
  imports: [DatabaseModule, FeishuModule],
  controllers: [UserController],
  providers: [...UserProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
