import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDomainDto } from '../dtos/create-domain.dto';
import { Domain, DomainStatus } from '../entities/domain.entity';

@Injectable()
export class DomainService {
  constructor(
    @InjectRepository(Domain)
    private domainRepository: Repository<Domain>,
  ) {}

  async create(createDomainDto: CreateDomainDto): Promise<Domain> {
    // Check if domain already exists
    const existingDomain = await this.domainRepository.findOne({
      where: { domain: createDomainDto.domain },
    });

    if (existingDomain) {
      // Update the existing domain's updatedAt timestamp
      existingDomain.updatedAt = new Date();
      return this.domainRepository.save(existingDomain);
    }

    // Create new domain
    const domain = this.domainRepository.create({
      domain: createDomainDto.domain,
      status: DomainStatus.PENDING,
      updatedAt: new Date(),
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
}
