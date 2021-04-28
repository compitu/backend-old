import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {Request, Response} from 'express';
import {User} from '../users/user.entity';
import {UsersService} from '../users/users.service';
import {JwtAuthGuard} from './jwt-auth.guard';
import {TokenService} from './token.service';

@Controller('auth')
export class AuthController {
    constructor(
        private usersService: UsersService,
        private tokenService: TokenService
    ) {}

    @Post('register')
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string
    ): Promise<Partial<User>> {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await this.usersService.create({
            name,
            email,
            password: hashedPassword,
        });
        const userWithoutPass = {
            id: user._id,
            name: user.name,
            email: user.email,
        };
        return userWithoutPass;
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string
    ): Promise<unknown> {
        const user = await this.usersService.findOne({email});

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
    async refresh(
        @Body('refresh') refreshToken: string,
        @Res({passthrough: true}) response: Response
    ): Promise<unknown> {
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

            const user = await this.usersService.findOne({_id: data.id});
            const userWithoutPass = {
                id: user.id,
                name: user.name,
                email: user.email,
            };
            return userWithoutPass;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Post('logout')
    async logout(
        @Res({passthrough: true}) response: Response
    ): Promise<{message: string}> {
        // ToDo: Implement properly the logout mechanism.
        return {message: 'Success'};
    }
}
