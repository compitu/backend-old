import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Tag extends Document {
    @Prop()
    name: string;

    @Prop()
    userId: string;

    @Prop()
    colorId: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Tag);
