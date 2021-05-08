import {IsString, Length} from 'class-validator';

export class CreateTagDto {
    @IsString()
    @Length(1)
    readonly name: string;

    @IsString()
    @Length(1)
    readonly userId: string;

    @IsString()
    @Length(1)
    readonly colorId: string;
}
