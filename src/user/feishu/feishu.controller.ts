import {
  Body,
  Query,
  Controller,
  Get,
  Post,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeishuService } from './feishu.service';

import { FeishuMessageDto, FeishuAuthDto } from './feishu.dto';

@ApiTags('飞书')
@Controller('feishu')
export class FeishuController {
  constructor(private readonly feishuService: FeishuService) {}

  @ApiOperation({
    summary: '消息推送',
  })
  @Version([VERSION_NEUTRAL])
  @Post('sendMessage')
  sendMessage(@Body() params: FeishuMessageDto) {
    const { receive_id_type, ...rest } = params;
    return this.feishuService.sendMessage(receive_id_type, rest);
  }

  @ApiOperation({
    summary:
      '登录预授权，由以下跳链触发: https://open.feishu.cn/open-apis/authen/v1/index?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ffeishu%2Fauth&app_id=cli_a49daaf813b8d00e',
  })
  @Version([VERSION_NEUTRAL])
  @Get('auth')
  auth(@Query() query: FeishuAuthDto) {
    const { code } = query;
    console.log('获取了登录预授权码');
    return this.feishuService.getUserToken(code);
    // return this.feishuService.sendMessage(receive_id_type, rest);
  }
}
