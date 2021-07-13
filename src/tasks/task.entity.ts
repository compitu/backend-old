import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Task extends Document {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: Boolean, required: true})
    done: boolean;

    @Prop({type: String, required: true})
    projectId: string;

    @Prop({type: String, required: true})
    userId: string;

    @Prop({type: Date})
    due: Date;

    @Prop({type: [String], required: false})
    tags: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
