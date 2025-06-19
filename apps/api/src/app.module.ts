import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import configFactory, { AppConfig } from './config';
import { DomainModule } from './domain/domain.module';

console.log(process.env.DB_HOST);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // allow injecting ConfigService in module factory
      load: [configFactory],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { host, port, username, password, database } =
          configService.get<AppConfig['database']>('database');
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: [__dirname + '../../**/*.entity.js'],
          synchronize: false,
          logging: process.env.NODE_ENV !== 'production',
        };
      },
    }),
    AuthModule,
    DomainModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
