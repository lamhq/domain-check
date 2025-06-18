import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateDomainDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl({ require_protocol: false, require_valid_protocol: false })
  domain: string;
}
