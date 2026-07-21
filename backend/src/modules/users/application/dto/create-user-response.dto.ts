export class CreateUserResponseDto {
  id!: string;

  name!: string;

  email!: string;

  password!: string;

  isEmailVerified!: boolean;

  createdAt!: Date;

  updatedAt!: Date;
}
