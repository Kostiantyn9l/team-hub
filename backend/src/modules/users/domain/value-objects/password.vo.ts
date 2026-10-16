import { ValidationError } from '@/shared/errors/error-categories';

export class Password {
  constructor(private readonly password: string) {
    if (password.length < 8)
      throw new ValidationError(
        'PASSWORD_TOO_SHORT',
        'Password must contain at least 8 characters long',
      );
  }

  get value() {
    return this.password;
  }
}
