import { User } from '@/modules/users/domain/entities/user.entity';
import type { IUserRepository } from '@/modules/users/domain/repositories/users.repository.interface';
import { USER_REPOSITORY_TOKEN } from '@/modules/users/domain/repositories/users.repository.token';
import { Email } from '@/modules/users/domain/value-objects/email.vo';
import { Name } from '@/modules/users/domain/value-objects/name.vo';
import { Password } from '@/modules/users/domain/value-objects/password.vo';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserResponseDto } from '../../dto/create-user/create-user-response.dto';
import * as bcrypt from 'bcrypt';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserResponseDto> {
    const name = new Name(input.name);
    const email = new Email(input.email);

    const saultRounds: number = 10;
    const hashedPassword: string = await bcrypt.hash(
      input.password,
      saultRounds,
    );
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
      password: user.Password.value,
      isEmailVerified: user.IsEmailVerified,
      createdAt: user.CreatedAt as Date,
      updatedAt: user.UpdatedAt as Date,
    };
  }
}
