import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Controller('trees')
export class AppController {
  // eslint-disable-next-line prettier/prettier
  constructor(@Inject('TASK_SERVICE') private client: ClientProxy) { }

  @Get()
  async getAllBooks() {
    console.log(this.client);
    const taskResponse = await this.client
      .send({ cmd: 'completed_task' }, { taskId: 123 })
      .pipe(timeout(5000))
      .toPromise();
    console.log(taskResponse);
    return taskResponse;
  }

  @Get(':id')
  getBook(@Param('id') id) {
    return id;
  }
}
