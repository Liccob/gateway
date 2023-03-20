import { Module } from '@nestjs/common';
import { DatabaseProviders } from './database.provides';

@Module({
  providers: [...DatabaseProviders],
  exports: [...DatabaseProviders],
})
export default class DatabaseModule {}
