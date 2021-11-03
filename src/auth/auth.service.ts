import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {UsersService} from '../users/users.service';
import {TokenService} from './token.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private tokenService: TokenService
    ) {}

    async validateUser(
        email: string,
        pass: string
    ): Promise<{id: string; email: string} | null> {
        const user = await this.usersService.findByEmail(email);
        if (user) {
            const passwordMatch = await bcrypt.compare(pass, user?.password);
            if (passwordMatch) {
                const {id, email} = user;
                return {id, email};
            }
        }
        return null;
    }

    async login(uid: string): Promise<{access: string; refresh: string}> {
        const access = await this.tokenService.generateAccessToken(uid);
        const refresh = await this.tokenService.generateRefreshToken(uid);
        return {access, refresh};
    }
}
