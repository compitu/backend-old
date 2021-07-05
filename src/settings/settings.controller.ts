import {Body, Controller, Get, Param, Put, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {SettingsService} from './settings.service';

@Controller()
export class SettingsController {
    public constructor(private readonly settingsService: SettingsService) {}

    @UseGuards(JwtAuthGuard)
    @Put('users/:userId/settings')
    async update(
        @Param('userId') userId: string,
        @Body() settings: {darkTheme: boolean}
    ): Promise<{darkTheme: boolean}> {
        const entity = await this.settingsService.update({
            userId,
            darkTheme: settings.darkTheme,
        });
        return {
            darkTheme: entity.darkTheme,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('users/:userId/settings')
    async findMany(
        @Param('userId') userId: string
    ): Promise<{darkTheme: boolean}> {
        const entity = await this.settingsService.findOne(userId);
        return {darkTheme: entity.darkTheme};
    }
}
