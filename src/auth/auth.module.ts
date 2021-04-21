import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {UsersModule} from '../users/users.module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET_KEY'),
                signOptions: {expiresIn: '120s'},
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
