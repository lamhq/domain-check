import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainController } from './controllers/domain.controller';
import { Domain } from './entities/domain.entity';
import { DomainService } from './services/domain.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain])],
  controllers: [DomainController],
  providers: [DomainService],
  exports: [DomainService],
})
export class DomainModule {}
