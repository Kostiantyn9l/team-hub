import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';

import { AuthController } from './presentation/controllers/auth.controller';
import { RegisterUseCase } from './application/use-cases/register/RegisterUseCase';
import { LoginUseCase } from './application/use-cases/login/LoginUseCase';

import { TOKEN_SERVICE_TOKEN } from './application/services/token/token.service.token';
import { JwtTokenService } from './infrastructure/jwt/jwt-token.service';
import { PASSWORD_HASH_SERVICE_TOKEN } from './application/services/password-hash/password-hash.service.token';
import { BcryptPasswordHashService } from './infrastructure/bcrypt/bcrypt-password-hash.service';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [
    RegisterUseCase,
    LoginUseCase,
    {
      provide: TOKEN_SERVICE_TOKEN,
      useClass: JwtTokenService,
    },
    {
      provide: PASSWORD_HASH_SERVICE_TOKEN,
      useClass: BcryptPasswordHashService,
    },
  ],
})
export class AuthModule {}
