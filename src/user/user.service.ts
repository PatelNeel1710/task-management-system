/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/schemas/create-user.dto';
import { UpdateUserDto } from 'src/schemas/update-user.dto';
import { IUser } from 'src/schemas/users.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<IUser>) { }

    async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        const newUser = await new this.userModel(createUserDto);
        return newUser.save();
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IUser> {
        const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
        if (!existingUser) {
            throw new NotFoundException(`User #${userId} not found`);
        }
        return existingUser;
    }

    async getAllUsers(): Promise<IUser[]> {
        const studentData = await this.userModel.find();
        if (!studentData || studentData.length == 0) {
            throw new NotFoundException('Users data not found!');
        }
        return studentData;
    }

    async getUser(userId: string): Promise<IUser> {
        const existingUser = await this.userModel.findById(userId).exec();
        if (!existingUser) {
            throw new NotFoundException(`User #${userId} not found`);
        }
        return existingUser;
    }

    async deleteUser(userId: string): Promise<any> {
        const deletedUser = await this.userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new NotFoundException(`User #${userId} not found`);
        }
        return deletedUser;
    }
}
