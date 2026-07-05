import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    length: 20,
  })
  name!: string;

  @Column({
    unique: true,
    length: 255,
  })
  email!: string;

  @Column({
    select: false,
  })
  password!: string;

  @Column({
    default: false,
  })
  is_email_verified!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
