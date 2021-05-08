import {IsDefined, IsString, Length} from 'class-validator';
import {ProjectType} from './project-type';

export class CreateProjectDto {
    @IsDefined()
    @IsString()
    @Length(1)
    readonly name: string;

    @IsDefined()
    @IsString()
    @Length(1)
    readonly userId: string;

    @IsString()
    readonly colorId: string;

    @IsDefined()
    @IsString()
    @Length(1)
    readonly type: ProjectType;
}
