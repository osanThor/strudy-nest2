import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello/:id/:name')
  getHello(
    @Req() req: Request,
    @Body() Bady,
    @Param() params: { id: string; name: string },
  ): string {
    // console.log(req);
    // console.log(Bady);
    // console.log(params);
    return this.appService.getHello();
  }
}
