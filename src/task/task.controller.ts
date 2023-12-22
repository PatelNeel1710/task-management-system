/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from 'src/schemas/create-task.dto';
import { UpdateTaskDto } from 'src/schemas/update-task.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    async createTask(@Res() response, @Body() createTaskDto: CreateTaskDto) {
        try {
            const newTask = await this.taskService.createTask(createTaskDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Task has been created successfully',
                newTask,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Task not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('/:id')
    async updateTask(@Res() response, @Param('id') taskId: string,
        @Body() updateTaskDto: UpdateTaskDto) {
        try {
            const existingTask = await this.taskService.updateTask(taskId, updateTaskDto);
            return response.status(HttpStatus.OK).json({
                message: 'Task has been successfully updated',
                existingTask,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    async getTasks(@Res() response) {
        try {
            const taskData = await this.taskService.getAllTasks();
            return response.status(HttpStatus.OK).json({
                message: 'All tasks data found successfully', taskData,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getStudent(@Res() response, @Param('id') taskId: string) {
        try {
            const existingTask = await
                this.taskService.getTask(taskId);
            return response.status(HttpStatus.OK).json({
                message: 'Task found successfully', existingTask,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    async deleteTask(@Res() response, @Param('id') taskId: string) {
        try {
            const deletedTask = await this.taskService.deleteTask(taskId);
            return response.status(HttpStatus.OK).json({
                message: 'Task deleted successfully',
                deletedTask,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
