import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {UsersModule} from '../users/users.module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JwtStrategy} from './jwt.strategy';
import {TokenService} from './token.service';

@Module({
    imports: [UsersModule, JwtModule.register({})],
    providers: [AuthService, JwtStrategy, TokenService],
    controllers: [AuthController],
})
export class AuthModule {}
