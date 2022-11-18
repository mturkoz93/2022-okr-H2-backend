import { Controller, Get } from '@nestjs/common';

// @Controller({ host: 'admin.example.com' })
@Controller('admin')
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}
