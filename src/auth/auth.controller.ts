import { FastifyReply } from 'fastify';
import {
  Controller,
  UseGuards,
  Res,
  Get,
  Query,
  VERSION_NEUTRAL,
  Version,
  Request,
  Logger,
} from '@nestjs/common';

import { AuthService } from './auth.servive';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetTokenByApplications } from './auth.dto';
import { Public } from './jwt_constants';
@ApiTags('用户认证')
@Controller({
  path: 'auth',
  version: [VERSION_NEUTRAL],
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: '飞书 Auth2 授权登录',
    description:
      '登录预授权，由以下跳链触发: https://open.feishu.cn/open-apis/authen/v1/index?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Ffeishu%2Fauth2&app_id=cli_a49daaf813b8d00e',
  })
  @Public()
  @Get('/feishu/auth2')
  async getFeishuTokenByApplications(
    @Query() query: GetTokenByApplications,
    @Res({
      passthrough: true,
    })
    response: FastifyReply,
  ) {
    const user = await this.authService.validateFeishuUser(query.code);
    const { access_token } = await this.authService.login(user);

    response.setCookie('jwt', access_token, {
      path: '/',
    });

    return access_token;
  }

  @ApiOperation({
    summary: '解析 token',
    description: '解析 token 信息',
  })
  @Get('/token/info')
  async getTokenInfo(@Request() req) {
    Logger.log(req);
  }
}
