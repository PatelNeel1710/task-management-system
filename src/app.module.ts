/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schemas/users.schema';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { TasksSchema } from './schemas/tasks.schema';
import { TaskService } from './task/task.service';
import { TaskController } from './task/task.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://umesh:WzSAjufDqJBiFK9W@cluster0.bsc6kwj.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: 'User', schema: UsersSchema }, { name: 'Task', schema: TasksSchema }]),
    ClientsModule.register([{
      name: 'TASK_SERVICE',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      }
    }])],
  controllers: [AppController, UserController, TaskController],
  providers: [UserService, TaskService],
})
export class AppModule { }