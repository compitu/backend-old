import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {Request, Response} from 'express';
import {User} from '../users/user.entity';
import {UsersService} from '../users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
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
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response
    ): Promise<{message: string}> {
        const user = await this.usersService.findOne({email});

        if (!user) {
            throw new UnauthorizedException();
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException();
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie('jwt', jwt, {httpOnly: true});

        return {message: 'Success'};
    }

    @Get('user')
    async user(@Req() request: Request): Promise<Partial<User>> {
        try {
            const cookie = request.cookies.jwt;
            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                throw new UnauthorizedException();
            }

            const user = await this.usersService.findOne({id: data._id});
            const userWithoutPass = {
                id: user._id,
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
        response.clearCookie('jwt');
        return {message: 'Success'};
    }
}
