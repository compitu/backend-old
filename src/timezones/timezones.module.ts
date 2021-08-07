import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Timezone, TimezoneSchema} from './timezone.entity';
import {TimezonesController} from './timezones.controller';
import {TimezonesService} from './timezones.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Timezone.name,
                schema: TimezoneSchema,
            },
        ]),
    ],
    controllers: [TimezonesController],
    providers: [TimezonesService],
    exports: [TimezonesService],
})
export class TimezonesModule {}
