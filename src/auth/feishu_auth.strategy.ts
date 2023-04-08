import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from "@nestjs/common";
import { Strategy } from "passport-local";
@Injectable()
export default class FeishuStrategy extends PassportStrategy(Strategy, 'feishu'){

}