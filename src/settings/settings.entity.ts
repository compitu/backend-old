import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Settings extends Document {
    @Prop({
        type: String,
        required: true,
    })
    userId: string;

    @Prop({
        type: Boolean,
        required: true,
    })
    darkTheme: boolean;

    @Prop({
        type: String,
        required: true,
    })
    timezone: string;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
