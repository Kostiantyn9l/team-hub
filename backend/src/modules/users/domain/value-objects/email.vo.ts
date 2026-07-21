export class Email {
  constructor(private readonly email: string) {
    if (!email.includes('@')) {
      throw new Error('Email must include "@"');
    }
  }

  get value(): string {
    return this.email;
  }
}
