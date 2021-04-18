import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Task extends Document {
    @Prop()
    label: string;

    @Prop()
    done: boolean;

    @Prop()
    projectId: string;

    @Prop()
    due?: Date;

    @Prop([String])
    tags?: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
