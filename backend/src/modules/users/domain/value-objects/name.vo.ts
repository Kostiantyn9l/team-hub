import { ValidationError } from '@/shared/errors/error-categories';

export class Name {
  constructor(private readonly name: string) {
    if (name.length < 6)
      throw new ValidationError(
        'NAME_TOO_SHORT',
        'The name must be at least 6 characters long',
      );
    else if (name.length > 20)
      throw new ValidationError(
        'NAME_TOO_LONG',
        'Name must contain at most 20 characters long',
      );
  }

  get value() {
    return this.name;
  }
}
