export class Name {
  constructor(private readonly name: string) {
    if (name.length < 6)
      throw new Error('The name must be at least 6 characters long');
    else if (name.length > 20)
      throw new Error('The name must at most 20 characters long');
  }

  get value() {
    return this.name;
  }
}
