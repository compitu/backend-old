import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    email: string;

    @Prop({type: String, required: true})
    password: string;

    @Prop({type: Boolean})
    darkTheme: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
