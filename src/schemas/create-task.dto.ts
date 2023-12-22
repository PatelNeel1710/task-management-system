/* eslint-disable prettier/prettier */
import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    readonly priority: string;

    @IsDateString({}, { each: true })
    @IsNotEmpty()
    readonly dueDate: Date;

    @IsBoolean()
    @IsOptional()
    isCompleted?: boolean;
}