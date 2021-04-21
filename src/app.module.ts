import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from './auth/auth.module';
import {TaskModule} from './task/task.module';
import {UsersModule} from './users/users.module';

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `./environments/${ENV}.env`,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('DB_URI'),
            }),
            inject: [ConfigService],
        }),
        TaskModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
