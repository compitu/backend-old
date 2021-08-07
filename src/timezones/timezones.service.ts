import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Timezone} from './timezone.entity';

@Injectable()
export class TimezonesService {
    public constructor(
        @InjectModel(Timezone.name)
        private timezoneModel: Model<Timezone>
    ) {}

    public async findAll(): Promise<
        {value: string; label: string; default: boolean}[]
    > {
        const timezones = await this.timezoneModel.find().exec();
        return timezones.map(tz => ({
            value: tz.value,
            label: tz.label,
            default: tz.default,
        }));
    }
}
