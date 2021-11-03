import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {UserPayload} from './user-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_ACCESS_SECRET_KEY'),
        });
    }

    public async validate(payload: any): Promise<UserPayload> {
        return {id: payload.sub, name: payload.name, email: payload.email};
    }
}
