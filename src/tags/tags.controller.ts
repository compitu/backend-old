import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {CreateTagDto} from './create-tag.dto';
import {TagsService} from './tags.service';

@Controller()
export class TagsController {
    public constructor(private readonly tagsService: TagsService) {}

    @UseGuards(JwtAuthGuard)
    @Post('tags')
    async create(
        @Body() createTagDto: CreateTagDto
    ): Promise<{id: string; name: string; colorId: string}> {
        const tag = await this.tagsService.create(createTagDto);
        return {id: tag._id, name: tag.name, colorId: tag.colorId};
    }

    @UseGuards(JwtAuthGuard)
    @Put('tags/:id')
    async update(
        @Param('id') id: string,
        @Body() tag: {id: string; name: string; colorId: string}
    ): Promise<{id: string; name: string; colorId: string}> {
        const entity = await this.tagsService.update(tag);
        return {
            id: entity._id,
            name: entity.name,
            colorId: entity.colorId,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Delete('tags/:id')
    async delete(@Param('id') id: string): Promise<{id: string}> {
        const project = await this.tagsService.delete(id);
        return {id: project._id};
    }

    @UseGuards(JwtAuthGuard)
    @Get('users/:userId/tags')
    async findMany(
        @Param('userId') userId: string
    ): Promise<{id: string; name: string; colorId: string}[]> {
        const tags = await this.tagsService.findMany(userId);
        return tags.map(tag => ({
            id: tag._id,
            name: tag.name,
            colorId: tag.colorId,
        }));
    }
}
