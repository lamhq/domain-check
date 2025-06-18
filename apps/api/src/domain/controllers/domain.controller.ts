import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateDomainDto } from '../dtos/create-domain.dto';
import { Domain } from '../entities/domain.entity';
import { DomainService } from '../services/domain.service';

@Controller('domains')
@UseGuards(JwtAuthGuard)
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDomainDto: CreateDomainDto): Promise<Domain> {
    return this.domainService.create(createDomainDto);
  }

  @Get()
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset?: number,
  ): Promise<Domain[]> {
    const [domains, total] = await this.domainService.findAll(offset, limit);
    res.set('x-total-count', total.toString());
    return domains;
  }
}
