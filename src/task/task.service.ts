/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/schemas/create-task.dto';
import { ITask } from 'src/schemas/tasks.interface';
import { UpdateTaskDto } from 'src/schemas/update-task.dto';

@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private taskModel: Model<ITask>) { }

    async createTask(createTaskDto: CreateTaskDto): Promise<ITask> {
        const newTask = await new this.taskModel(createTaskDto);
        return newTask.save();
    }

    async updateTask(taskId: string, updateTaskDto: UpdateTaskDto): Promise<ITask> {
        const existingTask = await this.taskModel.findByIdAndUpdate(taskId, updateTaskDto, { new: true });
        if (!existingTask) {
            this.ThrowNotFoundException(taskId);
        }
        return existingTask;
    }

    async getAllTasks(): Promise<ITask[]> {
        const taskData = await this.taskModel.find();
        if (!taskData || taskData.length == 0) {
            throw new NotFoundException('Tasks data not found!');
        }
        return taskData;
    }

    async getTask(taskId: string): Promise<ITask> {
        const existingTask = await this.taskModel.findById(taskId).exec();
        if (!existingTask) {
            this.ThrowNotFoundException(taskId);
        }
        return existingTask;
    }

    async deleteTask(taskId: string): Promise<any> {
        const deletedTask = await this.taskModel.findByIdAndDelete(taskId);
        if (!deletedTask) {
            this.ThrowNotFoundException(taskId);
        }
        return deletedTask;
    }

    async completeTask(taskId: string): Promise<ITask> {
        const existingTask = await this.taskModel.findById(taskId).exec();

        if (!existingTask) {
            this.ThrowNotFoundException(taskId);
        }

        if (existingTask.isCompleted) {
            throw new NotFoundException(`Task #${taskId} already completed`);
        }

        const completedTask = await this.taskModel.findByIdAndUpdate(taskId, { isCompleted: true }, { new: true });

        return completedTask;
    }

    private ThrowNotFoundException(taskId: string) {
        throw new NotFoundException(`Task #${taskId} not found`);
    }
}
