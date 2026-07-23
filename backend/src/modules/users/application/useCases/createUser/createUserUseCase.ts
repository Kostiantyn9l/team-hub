import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import type { IUserRepository } from '@/modules/users/domain/repositories/users.repository.interface';
import { USER_REPOSITORY_TOKEN } from '@/modules/users/domain/repositories/users.repository.token';

import { User } from '@/modules/users/domain/entities/user.entity';
import { Email } from '@/modules/users/domain/value-objects/email.vo';
import { Name } from '@/modules/users/domain/value-objects/name.vo';
import { Password } from '@/modules/users/domain/value-objects/password.vo';

import { CreateUserResponseDto } from '../../dto/create-user/create-user-response.dto';
import { CreateUserDto } from '../../dto/create-user/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<CreateUserResponseDto> {
    const name = new Name(dto.name);
    const email = new Email(dto.email);

    const saultRounds: number = 10;
    const hashedPassword: string = await bcrypt.hash(dto.password, saultRounds);
    const password = new Password(hashedPassword);

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
