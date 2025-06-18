import { Injectable } from '@nestjs/common';
import { AbstractKafkaConsumer, SubscribeToFixedGroup } from 'nestjs-kafka';
import { CheckResult } from '../types';
import { DomainService } from './domain.service';

@Injectable()
export class KafkaConsumerService extends AbstractKafkaConsumer {
  constructor(private readonly domainService: DomainService) {
    super();
  }

  protected registerTopic(): void {
    this.addTopic('domain-check-results');
  }

  @SubscribeToFixedGroup('domain-check-results')
  async handleDomainCheckResult(message: string) {
    const checkResult = JSON.parse(message) as CheckResult;
    await this.domainService.updateDomainCheckResult(checkResult);
  }
}
