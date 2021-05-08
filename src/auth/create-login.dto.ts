import {IsDefined, IsEmail, IsString, MinLength} from 'class-validator';

export class CreateLoginDto {
    @IsDefined()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsDefined()
    @IsString()
    @MinLength(6)
    readonly password: string;
}
