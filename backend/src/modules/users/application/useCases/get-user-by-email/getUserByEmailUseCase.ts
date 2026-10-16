import { Injectable, Inject } from '@nestjs/common';

import { USER_REPOSITORY_TOKEN } from '@/modules/users/domain/repositories/users.repository.token';
import type { IUserRepository } from '@/modules/users/domain/repositories/users.repository.interface';

import { GetUserByEmailDto } from '../../dto/get-user-by-email/get-user-by-email.dto';
import { UserResponseDto } from '../../dto/user-response.dto';

import { Email } from '@/modules/users/domain/value-objects/email.vo';

import { NotFoundError } from '@/shared/errors/error-categories';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: GetUserByEmailDto): Promise<UserResponseDto> {
    const email = new Email(dto.email);

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('USER_NOT_FOUND', 'User not found');
    }

    return {
      id: user.Id,
      name: user.Name.value,
      email: user.Email.value,
      isEmailVerified: user.IsEmailVerified,
      createdAt: user.CreatedAt as Date,
      updatedAt: user.UpdatedAt as Date,
    };
  }
}
