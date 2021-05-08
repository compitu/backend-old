import {IsDefined, IsString, Length} from 'class-validator';

export class CreateTagDto {
    @IsDefined()
    @IsString()
    @Length(1)
    readonly name: string;

    @IsDefined()
    @IsString()
    @Length(1)
    readonly userId: string;

    @IsDefined()
    @IsString()
    @Length(1)
    readonly colorId: string;
}
