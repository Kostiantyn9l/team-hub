import { Inject, Injectable } from '@nestjs/common';

import { TOKEN_SERVICE_TOKEN } from '../../services/token/token.service.token';
import type { ITokenService } from '../../services/token/token.service';
import { USER_REPOSITORY_TOKEN } from '@/modules/users/domain/repositories/users.repository.token';
import type { IUserRepository } from '@/modules/users/domain/repositories/users.repository.interface';
import { PASSWORD_HASH_SERVICE_TOKEN } from '../../services/password-hash/password-hash.service.token';
import type { IPasswordHashService } from '../../services/password-hash/password-hash.service';

import { Email } from '@/modules/users/domain/value-objects/email.vo';
import { Password } from '@/modules/users/domain/value-objects/password.vo';

import { LoginDto } from '../../dto/login/login.dto';
import { LoginResponseDto } from '../../dto/login/login-response.dto';

import { UnauthorizedError } from '@/shared/errors/error-categories';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,

    @Inject(TOKEN_SERVICE_TOKEN)
    private readonly tokenService: ITokenService,

    @Inject(PASSWORD_HASH_SERVICE_TOKEN)
    private readonly passwordHashService: IPasswordHashService,
  ) {}

  async execute(dto: LoginDto): Promise<LoginResponseDto> {
    const email = new Email(dto.email);
    const password = new Password(dto.password);
    const user = await this.userRepository.findByEmailForAuthentication(email);

    if (!user) {
      throw new UnauthorizedError('INVALID_CREDENTIALS', 'Invalid credentials');
    }

    const isPasswordValid = await this.passwordHashService.comparePassword(
      password.value,
      user.Password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError('INVALID_CREDENTIALS', 'Invalid credentials');
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.generateAccessToken({
        userId: user.Id,
        email: user.Email.value,
      }),
      this.tokenService.generateRefreshToken({
        userId: user.Id,
        email: user.Email.value,
      }),
    ]);

    return {
      user: {
        id: user.Id,
        name: user.Name.value,
        email: user.Email.value,
        isEmailVerified: user.IsEmailVerified,
        createdAt: user.CreatedAt as Date,
        updatedAt: user.UpdatedAt as Date,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
