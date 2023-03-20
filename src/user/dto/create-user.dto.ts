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
}
