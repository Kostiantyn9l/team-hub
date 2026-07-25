import { Injectable } from '@nestjs/common';

import { TokenPayload } from '../../application/types/token-payload';
import { ITokenService } from '../../application/services/token.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '15m',
    });
  }

  async generateRefreshToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '30d',
    });
  }

  async verifyAccessToken(accessToken: string): Promise<TokenPayload> {
    return this.jwtService.verifyAsync(accessToken, {
      secret: process.env.REFRESH_TOKEN_SECRET,
    });
  }

  async verifyRefreshToken(refreshToken: string): Promise<TokenPayload> {
    return this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_SECRET,
    });
  }
}
