import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {Color} from './color.entity';
import {ColorsService} from './colors.service';
import {CreateColorDto} from './create-color.dto';

@Controller('colors')
export class ColorController {
    public constructor(private readonly colorsService: ColorsService) {}

    @Post()
    async create(@Body() createColorDto: CreateColorDto): Promise<void> {
        await this.colorsService.create(createColorDto);
    }

    @Get()
    async findAll(): Promise<Color[]> {
        return this.colorsService.findAll();
    }

    @Get(':colorId')
    async findOne(@Param('colorId') colorId: string): Promise<Color> {
        return this.colorsService.findOne(colorId);
    }
}
