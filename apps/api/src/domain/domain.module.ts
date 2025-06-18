import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaModule } from 'nestjs-kafka';
import { DomainController } from './controllers/domain.controller';
import { Domain } from './entities/domain.entity';
import { DomainService } from './services/domain.service';
import { KafkaConsumerService } from './services/kafka-consumer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Domain]),
    KafkaModule.register({
      clientId: 'api-app',
      brokers: ['localhost:9092'],
      groupId: 'something',
    }) as DynamicModule,
  ],
  controllers: [DomainController],
  providers: [DomainService, KafkaConsumerService],
  exports: [DomainService],
})
export class DomainModule {}
