/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Tasks {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    priority: string;

    @Prop()
    dueDate: Date;

    @Prop()
    isCompleted?: boolean;
}
export const TasksSchema = SchemaFactory.createForClass(Tasks);