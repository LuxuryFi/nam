import { Controller, Get } from '@nestjs/common';
import { InternalService } from './internal.service';

@Controller('users')
export class InternalController {
  constructor(private readonly usersService: InternalService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.usersService.getHello();
  }
}
