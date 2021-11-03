import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import {CreateUserDto} from '../users/create-user.dto';
import {AuthService} from './auth.service';
import {JwtAuthGuard} from './jwt-auth.guard';
import {LocalAuthGuard} from './local-auth.guard';
import {TokenService} from './token.service';
import {UserPayload} from './user-payload';

interface Tokens {
    access: string;
    refresh: string;
}

@Controller('auth')
export class AuthController {
    constructor(
        private tokenService: TokenService,
        private authService: AuthService
    ) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<UserPayload> {
        const name = createUserDto.name;
        const email = createUserDto.email;
        const password = createUserDto.password;
        return this.authService.register(name, email, password);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: {user: UserPayload}): Promise<Tokens> {
        return this.authService.login(req.user);
    }

    @Post('refresh')
    async refresh(@Body('refresh') refreshToken: string): Promise<Tokens> {
        const data = await this.tokenService.verifyRefreshToken(refreshToken);

        if (!data) {
            throw new UnauthorizedException();
        }

        /*const access = await this.tokenService.generateAccessToken(data.id);
        const refresh = await this.tokenService.generateRefreshToken(data.id);

        return {access, refresh};*/

        return undefined;
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    async user(@Request() req): Promise<UserPayload> {
        return req.user;
    }

    @Post('logout')
    async logout(): Promise<{message: string}> {
        // ToDo: Implement properly the logout mechanism.
        return {message: 'Success'};
    }
}
