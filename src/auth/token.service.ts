import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {UserPayload} from './user-payload';

@Injectable()
export class TokenService {
    private accessSecret = this.configService.get('JWT_ACCESS_SECRET_KEY');
    private refreshSecret = this.configService.get('JWT_REFRESH_SECRET_KEY');
    private accessExpiresIn = this.configService.get('JWT_ACCESS_EXPIRE_IN');
    private refreshExpiresIn = this.configService.get('JWT_REFRESH_EXPIRE_IN');

    public constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    public generateAccessToken(user: UserPayload): Promise<string> {
        return this.generate(user, this.accessSecret, this.accessExpiresIn);
    }

    public generateRefreshToken(user: UserPayload): Promise<string> {
        return this.generate(user, this.refreshSecret, this.refreshExpiresIn);
    }

    private generate(
        user: UserPayload,
        secret: string,
        expiresIn: string | number
    ): Promise<string> {
        return this.jwtService.signAsync(
            {sub: user.id, name: user.name, email: user.email},
            {
                secret,
                expiresIn,
            }
        );
    }

    public verifyRefreshToken(token: string): Promise<{id: string}> {
        return this.verify(token, this.refreshSecret);
    }

    private verify(token: string, secret: string): Promise<{id: string}> {
        return this.jwtService
            .verifyAsync(token, {
                secret,
            })
            .catch(() => {
                throw new UnauthorizedException();
            });
    }
}
