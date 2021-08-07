import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateSettingsDto} from './create-settings.dto';
import {Settings} from './settings.entity';

@Injectable()
export class SettingsService {
    public constructor(
        @InjectModel(Settings.name)
        private settingsModel: Model<Settings>
    ) {}

    public async create(
        createSettingsDto: CreateSettingsDto
    ): Promise<Settings> {
        const createdSettings = new this.settingsModel(createSettingsDto);
        return createdSettings.save();
    }

    public async update(settings: {
        userId: string;
        darkTheme?: boolean;
        timezone?: string;
    }): Promise<Settings> {
        await this.settingsModel.updateOne({userId: settings.userId}, settings);
        return this.settingsModel.findOne({userId: settings.userId});
    }

    public async delete(userId: string): Promise<Settings> {
        return this.settingsModel.findOneAndDelete({userId});
    }

    public async findOne(userId: string): Promise<Settings> {
        return this.settingsModel.findOne({userId});
    }
}
