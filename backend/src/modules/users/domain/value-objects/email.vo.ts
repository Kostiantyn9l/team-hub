import { ValidationError } from '@/shared/errors/error-categories';

export class Email {
  constructor(private readonly email: string) {
    if (!email.includes('@')) {
      throw new ValidationError('INVALID_EMAIL', 'Email must include "@"');
    }
  }

  get value(): string {
    return this.email;
  }
}
