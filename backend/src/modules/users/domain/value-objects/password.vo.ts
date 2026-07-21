export class Password {
  constructor(private readonly password: string) {
    if (password.length < 8)
      throw new Error('The password must be more than 8 characters long');
  }

  get value() {
    return this.password;
  }
}
