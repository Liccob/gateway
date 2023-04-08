import { ApiProperty } from '@nestjs/swagger';

export class AuthToken {
  access_token: string;
}

export class GetTokenByApplications {
  @ApiProperty({ example: 'iPzSxfuXv81JAU7EXr3bog' })
  code: string;
}
