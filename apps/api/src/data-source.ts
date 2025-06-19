// Load environment variables
import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: [__dirname + '/migrations/*.ts'],
  migrationsTableName: 'migrations',
  logging: process.env.NODE_ENV !== 'production',
});
