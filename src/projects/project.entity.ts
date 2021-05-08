import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {ProjectType} from './project-type';

@Schema()
export class Project extends Document {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    userId: string;

    @Prop({type: String})
    colorId: string;

    @Prop({required: true})
    type: ProjectType;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
