import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggedInGuard } from './guards/logged-in.guard';
import { AdminGuard } from './guards/admin.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  publicRoute() {
    return this.appService.getPublicMessage();
  }

  @Get('protected')
  guardedRoute() {
    return this.appService.getPrivateMessage();
  }

  @Get('admin')
  getAdminMessage() {
    return this.appService.getAdminMessage();
  }
}
