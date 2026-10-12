import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { getEnvFilePath } from '../config/env-path';

config({
  path: getEnvFilePath(),
});

const isProduction = process.env.NODE_ENV === 'production';

export default new DataSource({
  type: 'postgres',

  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  synchronize: false,
  logging: false,

  entities: [
    isProduction
      ? 'dist/**/*.orm-entity{.ts,.js}'
      : 'src/**/*.orm-entity{.ts,.js}',
  ],
  migrations: [
    isProduction
      ? 'dist/infrastructure/postgres/migrations/*{.ts,.js}'
      : 'src/infrastructure/postgres/migrations/*{.ts,.js}',
  ],
});
