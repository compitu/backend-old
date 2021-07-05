import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {Request} from 'express';
import {ProjectType} from '../projects/project-type';
import {Project} from '../projects/project.entity';
import {ProjectsService} from '../projects/projects.service';
import {SettingsService} from '../settings/settings.service';
import {CreateUserDto} from '../users/create-user.dto';
import {User} from '../users/user.entity';
import {UsersService} from '../users/users.service';
import {CreateLoginDto} from './create-login.dto';
import {JwtAuthGuard} from './jwt-auth.guard';
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
        private settingsService: SettingsService
    ) {}

    @Post('register')
    async register(
        @Body() createUserDto: CreateUserDto
    ): Promise<Partial<User>> {
        const name = createUserDto.name;
        const email = createUserDto.email;
        const password = createUserDto.password;

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await this.usersService.create({
            name,
            email,
            password: hashedPassword,
        } as User);

        const settings = await this.settingsService.create({
            userId: user._id,
            darkTheme: false,
        });

        const project = await this.projectService.create({
            name: 'Inbox',
            type: ProjectType.BUILT_IN,
            userId: user._id,
            icon: 'inbox',
        } as Project);

        return {
            id: user._id,
            name: user.name,
            email: user.email,
        };
    }

    @Post('login')
    async login(@Body() createLoginDto: CreateLoginDto): Promise<Tokens> {
        const email = createLoginDto.email;
        const password = createLoginDto.password;

        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException();
        }

        const access = await this.tokenService.generateAccessToken(user.id);
        const refresh = await this.tokenService.generateRefreshToken(user.id);

        return {access, refresh};
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
        try {
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
        }
    }

    @Post('logout')
    async logout(): Promise<{message: string}> {
        // ToDo: Implement properly the logout mechanism.
        return {message: 'Success'};
    }
}
