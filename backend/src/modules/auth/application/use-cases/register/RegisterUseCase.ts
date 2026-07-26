import { Inject, Injectable } from '@nestjs/common';

import { CreateUserUseCase } from '@/modules/users/application/useCases/createUser/createUserUseCase';
import { RegisterResponseDto } from '../../dto/register-response.dto';
import { CreateUserDto } from '@/modules/users/application/dto/create-user/create-user.dto';

import type { ITokenService } from '../../services/token.service';
import { TOKEN_SERVICE_TOKEN } from '../../services/token.service.token';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,

    @Inject(TOKEN_SERVICE_TOKEN)
    private readonly tokenService: ITokenService,
  ) {}

  async execute(dto: CreateUserDto): Promise<RegisterResponseDto> {
    const user = await this.createUserUseCase.execute(dto);

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
