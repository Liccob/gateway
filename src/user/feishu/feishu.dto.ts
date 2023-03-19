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
