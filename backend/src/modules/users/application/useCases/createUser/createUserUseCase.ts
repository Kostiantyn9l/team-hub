import { Inject, Injectable } from '@nestjs/common';

import { USER_REPOSITORY_TOKEN } from '@/modules/users/domain/repositories/users.repository.token';
import type { IUserRepository } from '@/modules/users/domain/repositories/users.repository.interface';

import { User } from '@/modules/users/domain/entities/user.entity';
import { Email } from '@/modules/users/domain/value-objects/email.vo';
import { Name } from '@/modules/users/domain/value-objects/name.vo';

import { UserResponseDto } from '../../dto/user-response.dto';
import { CreateUserDto } from '../../dto/create-user/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<UserResponseDto> {
    const name = new Name(dto.name);
    const email = new Email(dto.email);
    const password = dto.password;

    const exist = await this.userRepository.findByEmail(email);
    if (exist) {
      throw new Error('This user is already exist');
    }

    const user = User.create(name, email, password);

    await this.userRepository.save(user);

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
