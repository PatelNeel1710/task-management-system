/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/schemas/create-user.dto';
import { UpdateUserDto } from 'src/schemas/update-user.dto';
import { TaskService } from 'src/task/task.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private readonly taskService: TaskService,
        @Inject('TASK_SERVICE') private readonly client: ClientProxy) { }

    @Post()
    async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
        try {
            const newUser = await this.userService.createUser(createUserDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully',
                newUser,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('/:id')
    async updateUser(@Res() response, @Param('id') userId: string,
        @Body() updateUserDto: UpdateUserDto) {
        try {
            const existingUser = await this.userService.updateUser(userId, updateUserDto);
            return response.status(HttpStatus.OK).json({
                message: 'User has been successfully updated',
                existingUser,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    async getUsers(@Res() response) {
        try {
            const userData = await this.userService.getAllUsers();
            return response.status(HttpStatus.OK).json({
                message: 'All users data found successfully', userData,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getUser(@Res() response, @Param('id') studentId: string) {
        try {
            const existingUser = await
                this.userService.getUser(studentId);
            return response.status(HttpStatus.OK).json({
                message: 'User found successfully', existingUser,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    async deleteStudent(@Res() response, @Param('id') userId: string) {
        try {
            const deletedUser = await this.userService.deleteUser(userId);
            return response.status(HttpStatus.OK).json({
                message: 'User deleted successfully',
                deletedUser,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }



    @Patch('/task/complete/:id')
    async completeTask(@Res() response, @Param('id') taskId: string) {
        try {
            const completedTask = await this.taskService.completeTask(taskId);
            const taskResponse = await this.client.send({ cmd: 'completed_task' }, { taskId });
            return response.status(HttpStatus.OK).json({
                message: 'Task has been successfully completed',
                completedTask,
                taskResponse
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
