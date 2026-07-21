import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserUseCase } from '../../application/useCases/createUser/createUserUseCase';
import { CreateUserDto } from '../../application/dto/create-user/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.createUserUseCase.execute(dto);
  }
}
