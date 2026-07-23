import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUseCase } from '../../application/use-cases/register/RegisterUseCase';
import { CreateUserDto } from '@/modules/users/application/dto/create-user/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return await this.registerUseCase.execute(dto);
  }
}
