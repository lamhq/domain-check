import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateDomainDto {
  @ApiProperty({ example: 'example.com', description: 'Domain name to check' })
  @IsString()
  @IsNotEmpty()
  @IsUrl({ require_protocol: false, require_valid_protocol: false })
  domain: string;
}
