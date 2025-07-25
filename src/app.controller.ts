import { Controller, Get, UseGuards, Res} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/html');
    res.send(this.appService.getHello());
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtectedHello(): string {
    return this.appService.getProtectedHello();
  }
}