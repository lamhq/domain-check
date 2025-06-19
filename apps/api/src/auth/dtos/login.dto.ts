import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  username: string;

  @ApiProperty({ example: 'password123', description: 'Password' })
  password: string;
}
