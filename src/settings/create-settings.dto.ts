import {IsBoolean, IsDefined, IsString, Length} from 'class-validator';

export class CreateSettingsDto {
    @IsDefined()
    @IsString()
    @Length(1)
    readonly userId: string;

    @IsDefined()
    @IsBoolean()
    readonly darkTheme: boolean;
}
