import { Injectable, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt_constants';
import { AuthService } from './auth.servive';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt.guard';

import { UserModule } from '../user/user.module';
import { FeishuModule } from '../user/feishu/feishu.module';
import { AuthController } from './auth.controller';
@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    FeishuModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      global: true,
      signOptions: {
        expiresIn: jwtConstants.expiresIn,
      },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
