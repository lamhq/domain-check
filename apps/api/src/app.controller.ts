import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  healthCheck(): string {
    return "I'm OK, i'm fine, Kìn chá nà!";
  }
}
