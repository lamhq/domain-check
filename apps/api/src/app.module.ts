import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DomainModule } from './domain/domain.module';

console.log(process.env.DB_HOST);
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '../../**/*.entity.js'],
      synchronize: false,
      logging: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    DomainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
