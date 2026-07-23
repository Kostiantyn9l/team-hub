import { Module } from '@nestjs/common';

import { RegisterUseCase } from './application/use-cases/register/RegisterUseCase';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [RegisterUseCase],
})
export class AuthModule {}
