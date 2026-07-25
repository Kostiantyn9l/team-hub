import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';

import { AuthController } from './presentation/controllers/auth.controller';
import { RegisterUseCase } from './application/use-cases/register/RegisterUseCase';

import { TOKEN_SERVICE_TOKEN } from './application/services/token.service.token';
import { JwtTokenService } from './infrastructure/jwt/jwt-token.service';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [
    RegisterUseCase,
    {
      provide: TOKEN_SERVICE_TOKEN,
      useClass: JwtTokenService,
    },
  ],
})
export class AuthModule {}
