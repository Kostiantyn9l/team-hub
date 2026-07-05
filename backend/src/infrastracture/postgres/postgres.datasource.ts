import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { getEnvFilePath } from '../config/env-path';

config({
  path: getEnvFilePath(),
});

export default new DataSource({
  type: 'postgres',

  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  synchronize: false,
  logging: false,

  entities: ['{src,dist}/**/*.entity{.ts,.js}'],
  migrations: ['{src,dist}/infrastructure/postgres/migrations/*{.ts,.js}'],
});
