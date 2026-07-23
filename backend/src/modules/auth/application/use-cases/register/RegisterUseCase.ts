import { Injectable } from '@nestjs/common';

import { CreateUserUseCase } from '@/modules/users/application/useCases/createUser/createUserUseCase';
import { RegisterResponseDto } from '../../dto/register-response.dto';
import { CreateUserDto } from '@/modules/users/application/dto/create-user/create-user.dto';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async execute(dto: CreateUserDto): Promise<RegisterResponseDto> {
    const user = await this.createUserUseCase.execute(dto);

    const token: string = '1234';
    return { user, token };
  }
}
