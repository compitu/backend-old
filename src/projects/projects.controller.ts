import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CreateProjectDto} from './create-project.dto';
import {Project} from './project.entity';
import {ProjectsService} from './projects.service';

@Controller()
export class ProjectsController {
    public constructor(private readonly projectService: ProjectsService) {}

    @Post('projects')
    async create(@Body() createProjectDto: CreateProjectDto): Promise<void> {
        await this.projectService.create(createProjectDto);
    }

    @Get('users/:userId/projects')
    async findMany(@Param('userId') userId: string): Promise<Project[]> {
        return this.projectService.findMany(userId);
    }
}
