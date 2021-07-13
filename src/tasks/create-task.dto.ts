import {Type} from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsDefined,
    IsString,
    Length,
} from 'class-validator';

export class CreateTaskDto {
    @IsDefined()
    @IsString()
    @Length(1)
    readonly name: string;

    @IsDefined()
    @IsBoolean()
    readonly done: boolean;

    @IsDefined()
    @IsString()
    @Length(1)
    readonly projectId: string;

    @IsDefined()
    @IsString()
    @Length(1)
    readonly userId: string;

    @Type(() => Date)
    @IsDate()
    readonly due: Date;

    @IsArray()
    readonly tags: string[];
}
