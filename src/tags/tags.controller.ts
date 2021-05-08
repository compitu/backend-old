import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CreateTagDto} from './create-tag.dto';
import {Tag} from './tag.entity';
import {TagsService} from './tags.service';

@Controller()
export class TagsController {
    public constructor(private readonly tagsService: TagsService) {}

    @Post('tags')
    async create(@Body() createTagDto: CreateTagDto): Promise<void> {
        await this.tagsService.create(createTagDto);
    }

    @Get('users/:userId/tags')
    async findMany(@Param('userId') userId: string): Promise<Tag[]> {
        return this.tagsService.findMany(userId);
    }
}
