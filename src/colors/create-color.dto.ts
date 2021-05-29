import {IsBoolean, IsDefined, IsString, Length} from 'class-validator';

export class CreateColorDto {
    @IsDefined()
    @IsString()
    @Length(1)
    readonly name: string;

    @IsDefined()
    @IsString()
    @Length(1)
    readonly hexCode: string;

    @IsDefined()
    @IsBoolean()
    readonly default: boolean;
}
