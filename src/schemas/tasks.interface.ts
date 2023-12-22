/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
export interface ITask extends Document {
    readonly title: string;
    readonly description: string;
    readonly priority: string;
    readonly dueDate: Date;
    readonly isCompleted?: boolean;
}
