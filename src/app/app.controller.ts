import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('wearforecast')
  // getHello(): string {
  //   return this.appService.getWelcome();
  // }
}
