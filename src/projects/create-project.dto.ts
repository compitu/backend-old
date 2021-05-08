import {ProjectType} from './project-type';

export class CreateProjectDto {
    readonly name: string;
    readonly userId: string;
    readonly colorId: string;
    readonly type: ProjectType;
}
