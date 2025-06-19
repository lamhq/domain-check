import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KafkaService } from 'nestjs-kafka';
import { Repository } from 'typeorm';
import { DOMAIN_CHECK_REQUESTS_TOPIC } from '../constants';
import { CreateDomainDto } from '../dtos/create-domain.dto';
import { Domain, DomainStatus } from '../entities/domain.entity';
import { CheckResult } from '../types';

@Injectable()
export class DomainService {
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepository: Repository<Domain>,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(createDomainDto: CreateDomainDto): Promise<Domain> {
    // Check if domain already exists
    const existingDomain = await this.domainRepository.findOne({
      where: { domain: createDomainDto.domain },
    });

    let domain: Domain;
    if (existingDomain) {
      // Update the existing domain for rechecking
      domain = existingDomain;
      domain.updatedAt = new Date();
      domain.status = DomainStatus.PENDING;
    } else {
      // Create new domain
      domain = this.domainRepository.create({
        domain: createDomainDto.domain,
        status: DomainStatus.PENDING,
        updatedAt: new Date(),
      });
    }
    // Add a request to validate the domain
    await this.kafkaService.sendMessage(DOMAIN_CHECK_REQUESTS_TOPIC, {
      body: { domain: domain.domain },
      messageId: `validate-domain-${Date.now()}`,
      messageType: 'validate-domain',
      topicName: DOMAIN_CHECK_REQUESTS_TOPIC,
    });

    return this.domainRepository.save(domain);
  }

  async findAll(offset = 0, limit = 10): Promise<[Domain[], number]> {
    return this.domainRepository.findAndCount({
      order: { updatedAt: 'DESC' },
      skip: offset,
      take: limit,
    });
  }

  async updateDomainCheckResult(checkResult: CheckResult): Promise<Domain> {
    const domain = await this.domainRepository.findOne({
      where: { domain: checkResult.domain },
    });
    if (!domain) {
      throw new NotFoundException('Domain not found');
    }
    domain.status = checkResult.error ? DomainStatus.FAILED : DomainStatus.PASSED;
    domain.error = checkResult.error;
    domain.dmarc = checkResult.dmarc === 'pass';
    domain.dmarcError = checkResult.dmarc_error;
    domain.spf = checkResult.spf === 'pass';
    domain.spfError = checkResult.spf_error;
    domain.dkim = checkResult.dkim === 'pass';
    domain.dkimError = checkResult.dkim_error;
    return this.domainRepository.save(domain);
  }
}
