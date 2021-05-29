import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {Color} from './color.entity';
import {ColorsService} from './colors.service';
import {CreateColorDto} from './create-color.dto';

interface ColorResponse {
    id: string;
    name: string;
    hexCode: string;
    default: boolean;
}

@Controller('colors')
export class ColorController {
    public constructor(private readonly colorsService: ColorsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createColorDto: CreateColorDto): Promise<void> {
        await this.colorsService.create(createColorDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<ColorResponse[]> {
        const colors = await this.colorsService.findAll();
        return colors.map(c => ({
            id: c._id,
            name: c.name,
            hexCode: c.hexCode,
            default: c.default,
        }));
    }

    @UseGuards(JwtAuthGuard)
    @Get(':colorId')
    async findOne(@Param('colorId') colorId: string): Promise<Color> {
        return this.colorsService.findOne(colorId);
    }
}
