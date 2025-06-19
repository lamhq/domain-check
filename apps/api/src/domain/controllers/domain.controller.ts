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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateDomainDto } from '../dtos/create-domain.dto';
import { Domain } from '../entities/domain.entity';
import { DomainService } from '../services/domain.service';

@ApiTags('Domains')
@ApiBearerAuth()
@Controller('domains')
@UseGuards(JwtAuthGuard)
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a domain for checking' })
  @ApiBody({ type: CreateDomainDto })
  @ApiResponse({ status: 201, description: 'Domain added' })
  async create(@Body() createDomainDto: CreateDomainDto): Promise<Domain> {
    return this.domainService.create(createDomainDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all domains' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit number of results',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Offset for pagination',
  })
  @ApiResponse({ status: 200, description: 'List of domains' })
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
