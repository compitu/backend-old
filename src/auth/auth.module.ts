import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ProjectsModule} from '../projects/projects.module';
import {SettingsModule} from '../settings/settings.module';
import {UsersModule} from '../users/users.module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JwtStrategy} from './jwt.strategy';
import {TokenService} from './token.service';

@Module({
    imports: [
        JwtModule.register({}),
        UsersModule,
        ProjectsModule,
        SettingsModule,
    ],
    providers: [AuthService, JwtStrategy, TokenService],
    controllers: [AuthController],
})
export class AuthModule {}
