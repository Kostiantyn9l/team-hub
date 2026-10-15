import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { IPasswordHashService } from '../../application/services/password-hash/password-hash.service';

@Injectable()
export class BcryptPasswordHashService implements IPasswordHashService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
