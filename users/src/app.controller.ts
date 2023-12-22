import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly appService: AppService) { }

  @MessagePattern({ cmd: 'completed_task' })
  async getHello(data: any): Promise<string> {
    console.log(data);
    return this.appService.getHello();
  }
}
