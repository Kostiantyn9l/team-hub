import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterUseCase } from '../../application/use-cases/register/RegisterUseCase';
import { CreateUserDto } from '@/modules/users/application/dto/create-user/create-user.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post('register')
  async register(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.registerUseCase.execute(dto);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/auth/refresh',
    });

    return {
      user: result.user,
      accessToken: result.accessToken,
    };
  }
}
