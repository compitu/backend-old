import {Controller, Get, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {TimezonesService} from './timezones.service';

@Controller()
export class TimezonesController {
    public constructor(private readonly timezonesService: TimezonesService) {}

    @UseGuards(JwtAuthGuard)
    @Get('timezones')
    async findAll(): Promise<
        {value: string; label: string; default: boolean}[]
    > {
        return this.timezonesService.findAll();
    }
}
