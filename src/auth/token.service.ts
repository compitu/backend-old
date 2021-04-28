import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';

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

    public generateAccessToken(uid: string): Promise<string> {
        return this.generate(uid, this.accessSecret, this.accessExpiresIn);
    }

    public generateRefreshToken(uid: string): Promise<string> {
        return this.generate(uid, this.refreshSecret, this.refreshExpiresIn);
    }

    private generate(
        uid: string,
        secret: string,
        expiresIn: string | number
    ): Promise<string> {
        return this.jwtService.signAsync(
            {id: uid},
            {
                secret,
                expiresIn,
            }
        );
    }

    public verifyAccessToken(token: string): Promise<{id: string}> {
        return this.verify(token, this.accessSecret);
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
