import {
    IsBoolean,
    IsDefined,
    IsEmail,
    IsString,
    Length,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsDefined()
    @IsString()
    @Length(4)
    readonly name: string;

    @IsDefined()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsDefined()
    @IsString()
    @MinLength(6)
    readonly password: string;

    @IsBoolean()
    readonly darkTheme: boolean;
}
