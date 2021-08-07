import {Prop, SchemaFactory, Schema} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Timezone extends Document {
    @Prop({
        type: String,
    })
    value: string;

    @Prop({
        type: String,
    })
    continent: string;

    @Prop({
        type: Number,
    })
    offsetInMin: number;

    @Prop({
        type: String,
    })
    label: string;

    @Prop({
        type: Boolean,
    })
    default: boolean;
}

export const TimezoneSchema = SchemaFactory.createForClass(Timezone);
