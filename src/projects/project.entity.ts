import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {ProjectType} from './project-type';

@Schema()
export class Project extends Document {
    @Prop()
    name: string;

    @Prop()
    userId: string;

    @Prop()
    colorId: string;

    @Prop()
    type: ProjectType;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
