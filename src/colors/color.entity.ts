import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Color extends Document {
    @Prop()
    name: string;

    @Prop()
    hexCode: string;

    @Prop()
    default: boolean;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
