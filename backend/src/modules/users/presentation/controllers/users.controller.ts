import { Controller, Get, Query } from '@nestjs/common';

import { CreateUserUseCase } from '../../application/useCases/createUser/createUserUseCase';
import { GetUserByEmailUseCase } from '../../application/useCases/get-user-by-email/getUserByEmailUseCase';
import { GetUserByEmailDto } from '../../application/dto/get-user-by-email/get-user-by-email.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
  ) {}

  @Get()
  async get(@Query() dto: GetUserByEmailDto) {
    return this.getUserByEmailUseCase.execute(dto);
  }
}
