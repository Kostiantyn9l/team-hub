import { Inject, Injectable } from '@nestjs/common';

import { CreateUserUseCase } from '@/modules/users/application/useCases/createUser/createUserUseCase';
import { RegisterResponseDto } from '../../dto/register/register-response.dto';
import { CreateUserDto } from '@/modules/users/application/dto/create-user/create-user.dto';

import { TOKEN_SERVICE_TOKEN } from '../../services/token/token.service.token';
import type { ITokenService } from '../../services/token/token.service';
import { PASSWORD_HASH_SERVICE_TOKEN } from '../../services/password-hash/password-hash.service.token';
import type { IPasswordHashService } from '../../services/password-hash/password-hash.service';
import { Password } from '@/modules/users/domain/value-objects/password.vo';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,

    @Inject(TOKEN_SERVICE_TOKEN)
    private readonly tokenService: ITokenService,

    @Inject(PASSWORD_HASH_SERVICE_TOKEN)
    private readonly passwordHashService: IPasswordHashService,
  ) {}

  async execute(dto: CreateUserDto): Promise<RegisterResponseDto> {
    const password = new Password(dto.password);
    const hashedPassword: string = await this.passwordHashService.hashPassword(
      password.value,
    );

    const user = await this.createUserUseCase.execute({
      ...dto,
      password: hashedPassword,
    });

    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.generateAccessToken({
        userId: user.id,
        email: user.email,
      }),

      this.tokenService.generateRefreshToken({
        userId: user.id,
        email: user.email,
      }),
    ]);

    return {
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
