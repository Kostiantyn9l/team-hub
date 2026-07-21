import { Name } from '../value-objects/name.vo';
import { Email } from '../value-objects/email.vo';
import { Password } from '../value-objects/password.vo';

export class User {
  constructor(
    private readonly id: string,
    private name: Name,
    private email: Email,
    private password: Password,
    private isEmailVerified: boolean,
    private createdAt?: Date,
    private updatedAt?: Date,
  ) {}

  static create(name: Name, email: Email, password: Password): User {
    const now = new Date();
    return new User(
      crypto.randomUUID(),
      name,
      email,
      password,
      false,
      now,
      now,
    );
  }
  static restore(
    id: string,
    name: Name,
    email: Email,
    password: Password,
    isEmailVerified: boolean,
    createdAt: Date,
    updatedAt?: Date,
  ) {
    return new User(
      id,
      name,
      email,
      password,
      isEmailVerified,
      createdAt,
      updatedAt,
    );
  }

  get Id(): string {
    return this.id;
  }
  get Name(): Name {
    return this.name;
  }
  get Email(): Email {
    return this.email;
  }
  get Password(): Password {
    return this.password;
  }
  get IsEmailVerified(): boolean {
    return this.isEmailVerified;
  }
  get CreatedAt() {
    return this.createdAt;
  }
  get UpdatedAt() {
    return this.updatedAt;
  }

  changeName(newName: Name) {
    this.name = newName;
    this.updatedAt = new Date();
  }
  changePassword(newPassword: Password) {
    this.password = newPassword;
    this.updatedAt = new Date();
  }
  verifyEmail() {
    if (this.isEmailVerified) {
      throw new Error('Email is already verified');
    }

    this.isEmailVerified = true;
    this.updatedAt = new Date();
  }
}
