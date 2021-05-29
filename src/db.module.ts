import {Module, OnModuleInit} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {InjectConnection, MongooseModule} from '@nestjs/mongoose';
import {isNil} from 'lodash';
import {Connection} from 'mongoose';
import {seed} from './build/seeder';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('DB_URI'),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [],
    providers: [],
})
export class DbModule implements OnModuleInit {
    constructor(@InjectConnection() private connection: Connection) {}

    onModuleInit(): void {
        this.connection.db
            .listCollections({name: 'colors'})
            .next((err, collinfo) => {
                if (isNil(collinfo)) {
                    seed();
                }
            });
    }
}
