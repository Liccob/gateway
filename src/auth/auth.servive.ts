import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/src/user/entities/user.mongo.entity';
import { UserService } from 'src/user/user.service';
import { FeishuService } from '../user/feishu/feishu.service';
import { FeishuUserInfo } from '../user/feishu/feishu.dto';
@Injectable()
export class AuthService {
  constructor(
    private JwtService: JwtService,
    private UserService: UserService,
    private FeishuService: FeishuService,
  ) {}
  async validateFeishuUser(code: string) {
    const feishu_info: FeishuUserInfo =
      await this.getFeishuUserInfoByApplications(code);

    // 将飞书的用户信息同步到数据库
    const user: User = await this.UserService.createOrSaveFeishu(feishu_info);
    Logger.log('Validate FeishuUser', JSON.stringify(user));
    return {
      userId: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      feishuAccessToken: feishu_info.accessToken,
      feishuUserId: feishu_info.feishuUserId,
    };
  }

  async login(user: Payload) {
    return {
      access_token: this.JwtService.sign(user),
    };
  }

  async getFeishuUserInfoByApplications(code: string) {
    const data = await this.FeishuService.getUserToken(code);
    const feishuInfo: FeishuUserInfo = {
      accessToken: data.access_token,
      avatarBig: data.avatar_big,
      avatarMiddle: data.avatar_middle,
      avatarThumb: data.avatar_thumb,
      avatarUrl: data.avatar_url,
      email: data.email,
      enName: data.en_name,
      mobile: data.mobile,
      name: data.name,
      feishuUnionId: data.union_id,
      feishuUserId: data.user_id,
    };

    return feishuInfo;
  }
}
