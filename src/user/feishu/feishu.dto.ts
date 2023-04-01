import { RECEIVE_TYPE, MSG_TYPE } from '@/src/helper/feishu/message';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class FeishuMessageDto {
  @ApiProperty({ example: 'user_id', enum: RECEIVE_TYPE })
  @IsEnum(RECEIVE_TYPE)
  receive_id_type: RECEIVE_TYPE;

  @ApiProperty({ example: 'agcc9ag1' })
  @IsNotEmpty()
  receive_id?: string;

  @ApiProperty({ example: '{"text":" test content"}' })
  @IsNotEmpty()
  content?: string;

  @ApiProperty({ example: 'text', enum: MSG_TYPE })
  @IsEnum(MSG_TYPE)
  @IsNotEmpty()
  msg_type?: keyof MSG_TYPE;
}

export class FeishuAuthDto {
  @ApiProperty({ example: 'xxxxxxxxxxx' })
  code?: string;

  @ApiProperty({ example: 'xxxxxxx' })
  state?: string;
}

export interface UserTokenInfoRes {
  code: number;
  msg: string;
  data: UserTokenInfo;
}

export interface UserTokenInfo {
  access_token: string;
  token_type: string;
  expires_in: number;
  name: string;
  en_name: string;
  avatar_url: string;
  avatar_thumb: string;
  avatar_middle: string;
  avatar_big: string;
  open_id: string;
  union_id: string;
  email: string;
  enterprise_email: string;
  user_id: string;
  mobile: string;
  tenant_key: string;
  refresh_expires_in: number;
  refresh_token: string;
  sid: string;
}

export interface FeishuUserInfo {
  accessToken: string;
  avatarBig: string;
  avatarMiddle: string;
  avatarThumb: string;
  avatarUrl: string;
  email: string;
  enName: string;
  mobile: string;
  name: string;
  feishuUnionId: string;
  feishuUserId: string;
}
