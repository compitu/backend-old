import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Request,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import {ProjectsService} from '../projects/projects.service';
import {SettingsService} from '../settings/settings.service';
import {CreateUserDto} from '../users/create-user.dto';
import {User} from '../users/user.entity';
import {UsersService} from '../users/users.service';
import {AuthService} from './auth.service';
import {JwtAuthGuard} from './jwt-auth.guard';
import {LocalAuthGuard} from './local-auth.guard';
import {TokenService} from './token.service';

interface Tokens {
    access: string;
    refresh: string;
}

@Controller('auth')
export class AuthController {
    constructor(
        private usersService: UsersService,
        private tokenService: TokenService,
        private projectService: ProjectsService,
        private settingsService: SettingsService,
        private authService: AuthService
    ) {}

    @Post('register')
    async register(
        @Body() createUserDto: CreateUserDto
    ): Promise<Partial<User>> {
        const name = createUserDto.name;
        const email = createUserDto.email;
        const password = createUserDto.password;
        return this.authService.register(name, email, password);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Request() req: {user: {id: string; email: string}}
    ): Promise<Tokens> {
        return this.authService.login(req.user.id);
    }

    @Post('refresh')
    async refresh(@Body('refresh') refreshToken: string): Promise<Tokens> {
        const data = await this.tokenService.verifyRefreshToken(refreshToken);

        if (!data) {
            throw new UnauthorizedException();
        }

        const access = await this.tokenService.generateAccessToken(data.id);
        const refresh = await this.tokenService.generateRefreshToken(data.id);

        return {access, refresh};
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    async user(@Req() request: Request): Promise<Partial<User>> {
        /*try {
            const authHeader = request.header('Authorization');

            if (!authHeader.startsWith('Bearer')) {
                throw new UnauthorizedException();
            }

            const accessToken = authHeader.slice(7, authHeader.length);

            const data = await this.tokenService.verifyAccessToken(accessToken);

            if (!data) {
                throw new UnauthorizedException();
            }

            const user = await this.usersService.findById(data.id);
            return {
                id: user.id,
                name: user.name,
                email: user.email,
            };
        } catch (e) {
            throw new UnauthorizedException();
        }*/

        return undefined;
    }

    @Post('logout')
    async logout(): Promise<{message: string}> {
        // ToDo: Implement properly the logout mechanism.
        return {message: 'Success'};
    }
}
