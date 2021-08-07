import {Body, Controller, Get, Param, Put, UseGuards} from '@nestjs/common';
import {isNil} from 'lodash';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {SettingsService} from './settings.service';

@Controller()
export class SettingsController {
    public constructor(private readonly settingsService: SettingsService) {}

    @UseGuards(JwtAuthGuard)
    @Put('users/:userId/settings')
    async update(
        @Param('userId') userId: string,
        @Body() settings: {darkTheme?: boolean; timezone?: string}
    ): Promise<{darkTheme?: boolean; timezone?: string}> {
        if (!isNil(settings.darkTheme)) {
            const entity = await this.settingsService.update({
                userId,
                darkTheme: settings.darkTheme,
            });
            return {
                darkTheme: entity.darkTheme,
            };
        }

        if (!isNil(settings.timezone)) {
            const entity = await this.settingsService.update({
                userId,
                timezone: settings.timezone,
            });
            return {
                timezone: entity.timezone,
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('users/:userId/settings')
    async findMany(
        @Param('userId') userId: string
    ): Promise<{darkTheme: boolean; timezone: string}> {
        const entity = await this.settingsService.findOne(userId);
        return {darkTheme: entity.darkTheme, timezone: entity.timezone};
    }
}
