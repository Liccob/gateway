import { join } from 'path';

import { fastLogger } from './logger';

const logOpt = {
  console: process.env.NODE_ENV !== 'production', // 是否开启 console.log
  level: 'info',
  fileName: join(process.cwd(), 'logs/fast-gateway.log'), // 文件路径
  maxBufferLength: 4096, // 日志写入缓存队列最大长度
  flushInterval: 1000, // flush间隔
  logRotator: {
    // 分割配置
    byHour: true,
    byDay: false,
    hourDelimiter: '_',
  },
};

export const FastifyLogger = fastLogger(logOpt);
