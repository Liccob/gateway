import { getUserToken, refreshUserToken } from './../../helper/feishu/auth';
import { BusinessException } from '@/src/common/exceptions/business.exception.filter';
import { getAppToken } from '@/src/helper/feishu/auth';
import { messages } from '@/src/helper/feishu/message';
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { UserTokenInfo } from './feishu.dto';
import { BUSINESS_ERROR_CODE } from '@/src/common/exceptions/business.error.code';

@Injectable()
export class FeishuService {
  private APP_TOKEN_CACHE_KEY;
  private USER_TOKEN_CACHE_KEY;
  private USER_REFRESH_TOKEN_CACHE_KEY;
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {
    this.APP_TOKEN_CACHE_KEY = this.configService.get('APP_TOKEN_CACHE_KEY');
    this.USER_TOKEN_CACHE_KEY = this.configService.get('USER_TOKEN_CACHE_KEY');
    this.USER_REFRESH_TOKEN_CACHE_KEY = this.configService.get(
      'USER_REFRESH_TOKEN_CACHE_KEY',
    );
  }
  async getAppToken() {
    let appToken: string;
    appToken = await this.cacheManager.get(this.APP_TOKEN_CACHE_KEY);
    console.log('appToken', appToken);
    if (!appToken) {
      const res = await getAppToken();
      if (res.code === 0) {
        appToken = res.app_access_token;
        this.cacheManager.set(
          this.APP_TOKEN_CACHE_KEY,
          appToken,
          res.expire - 60,
        );
      } else {
        throw new BusinessException('飞书调用异常');
      }
    }
    return appToken;
  }

  async sendMessage(receive_id_type, params) {
    const app_token = await this.getAppToken();
    return messages(receive_id_type, params, app_token as string);
  }

  async getUserToken(code: string) {
    const appToken = await this.getAppToken();
    Logger.log('app_token:' + appToken);
    const res = await getUserToken({
      code,
      app_token: appToken,
    });
    if (res.code === 0) {
      Logger.log('登录成功:' + JSON.stringify(res));
      this.setUserAccessTokenCache(res.data);
      return res.data;
    } else {
      throw new BusinessException('获取登录信息失败:' + JSON.stringify(res));
    }
  }

  async setUserAccessTokenCache(options: UserTokenInfo) {
    const {
      user_id,
      access_token,
      refresh_token,
      expires_in,
      refresh_expires_in,
    } = options || {};
    await this.cacheManager.set(
      `${this.USER_TOKEN_CACHE_KEY}_${user_id}`,
      access_token,
      expires_in - 60,
    );

    await this.cacheManager.set(
      `${this.USER_REFRESH_TOKEN_CACHE_KEY}_${user_id}`,
      refresh_token,
      refresh_expires_in - 60,
    );
  }

  async getCachedUserToken(userId: string) {
    let userToken: string = await this.cacheManager.get(
      `${this.USER_TOKEN_CACHE_KEY}_${userId}`,
    );

    // 如果 token 失效
    if (!userToken) {
      const refreshToken: string = await this.cacheManager.get(
        `${this.USER_REFRESH_TOKEN_CACHE_KEY}_${userId}`,
      );
      if (!refreshToken) {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.TOKEN_INVALID,
          message: 'token 已失效',
        });
      }
      // 获取新的用户 token
      const usrTokenInfo = await this.getUserTokenByRefreshToken(refreshToken);
      // 更新缓存的用户 token
      await this.setUserAccessTokenCache(usrTokenInfo);
      userToken = usrTokenInfo.access_token;
    }
    return userToken;
  }

  async getUserTokenByRefreshToken(refreshToken: string) {
    const res = await refreshUserToken({
      refreshToken,
      app_token: await this.getAppToken(),
    });
    if (res.code === 0) {
      return res.data;
    }
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.REFRESH_FAIL,
      message: '更新用户登陆信息失败',
    });
  }
}
