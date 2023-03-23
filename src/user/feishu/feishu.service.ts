import { BusinessException } from '@/src/common/exceptions/business.exception.filter';
import { getAppToken } from '@/src/helper/feishu/auth';
import { messages } from '@/src/helper/feishu/message';
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class FeishuService {
  private APP_TOKEN_CACHE_KEY;
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {
    this.APP_TOKEN_CACHE_KEY = this.configService.get('APP_TOKEN_CACHE_KEY');
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
}
