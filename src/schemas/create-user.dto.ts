/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    readonly email: string;

    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    readonly type: string;
}