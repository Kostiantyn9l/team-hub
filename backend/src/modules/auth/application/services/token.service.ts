import { TokenPayload } from '../types/token-payload';

export interface ITokenService {
  generateAccessToken(payload: TokenPayload): Promise<string>;

  generateRefreshToken(payload: TokenPayload): Promise<string>;

  verifyAccessToken(accessToken: string): Promise<TokenPayload>;

  verifyRefreshToken(refreshToken: string): Promise<TokenPayload>;
}
