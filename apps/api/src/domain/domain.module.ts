import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaModule } from 'nestjs-kafka';
import { DomainController } from './controllers/domain.controller';
import { Domain } from './entities/domain.entity';
import { DomainService } from './services/domain.service';
import { KafkaConsumerService } from './services/kafka-consumer.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Domain]),
    KafkaModule.register({
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: [process.env.KAFKA_BROKER],
      groupId: process.env.KAFKA_GROUP_ID,
    }) as DynamicModule,
  ],
  controllers: [DomainController],
  providers: [DomainService, KafkaConsumerService],
  exports: [DomainService],
})
export class DomainModule {}
