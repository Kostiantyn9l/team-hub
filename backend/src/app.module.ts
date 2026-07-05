import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { PostgresModule } from './infrastracture/postgres/postgres.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './infrastracture/redis/redis.module';
import { getEnvFilePath } from './infrastracture/config/env-path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
    }),
    PostgresModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
