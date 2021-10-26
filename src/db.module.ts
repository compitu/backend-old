import {Module, OnModuleInit} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {InjectConnection, MongooseModule} from '@nestjs/mongoose';
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
        this.connection.collection('colors').countDocuments((err, count) => {
            if (count === 0) {
                seed();
            }
        });
    }
}
