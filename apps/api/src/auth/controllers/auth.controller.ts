import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('access-tokens')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const authResult = await this.authService.login(
      loginDto.username,
      loginDto.password,
    );
    res.cookie('accessToken', authResult.accessToken, { httpOnly: true });
    return authResult;
  }
}
