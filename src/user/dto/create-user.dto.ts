import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: '123' })
  id?: string;

  @ApiProperty({ example: 'david' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'david@gmail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'davide' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example:
      'https://s1-imfile.feishucdn.com/static-resource/v1/v2_b61fbc17-a2ae-4fce-b7a6-96e3830edf0g',
  })
  @IsNotEmpty()
  avatarUrl: string;
}
