import { FeishuController } from './feishu.controller';
import { Module } from '@nestjs/common';
import { FeishuService } from './feishu.service';
@Module({
  controllers: [FeishuController],
  providers: [FeishuService],
  exports: [FeishuService],
})
export class FeishuModule {}
