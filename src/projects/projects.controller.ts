import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {CreateProjectDto} from './create-project.dto';
import {Project} from './project.entity';
import {ProjectsService} from './projects.service';

@Controller()
export class ProjectsController {
    public constructor(private readonly projectService: ProjectsService) {}

    @UseGuards(JwtAuthGuard)
    @Post('projects')
    async create(@Body() createProjectDto: CreateProjectDto): Promise<void> {
        await this.projectService.create(createProjectDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('users/:userId/projects')
    async findMany(@Param('userId') userId: string): Promise<Project[]> {
        return this.projectService.findMany(userId);
    }
}
