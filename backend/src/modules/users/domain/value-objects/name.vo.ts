export class Name {
  constructor(private readonly name: string) {
    if (name.length < 6)
      throw new Error('The name must be more than 6 characters long');
  }

  get value() {
    return this.name;
  }
}
