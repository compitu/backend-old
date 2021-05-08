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

    @IsDate({always: false})
    readonly due: Date;

    @IsString({each: true})
    @IsArray()
    readonly tags: string[];
}
