import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {CreateProjectDto} from './create-project.dto';
import {ProjectsResponse} from './project-response';
import {ProjectsService} from './projects.service';

@Controller()
export class ProjectsController {
    public constructor(private readonly projectService: ProjectsService) {}

    @UseGuards(JwtAuthGuard)
    @Post('projects')
    async create(
        @Body() createProjectDto: CreateProjectDto
    ): Promise<{id: string; name: string; colorId: string}> {
        const project = await this.projectService.create(createProjectDto);
        return {id: project.id, name: project.name, colorId: project.colorId};
    }

    @UseGuards(JwtAuthGuard)
    @Delete('projects/:id')
    async delete(@Param('id') id: string): Promise<{id: string}> {
        const project = await this.projectService.delete(id);
        return {id: project._id};
    }

    @UseGuards(JwtAuthGuard)
    @Get('users/:userId/projects')
    async findMany(@Param('userId') userId: string): Promise<ProjectsResponse> {
        return this.projectService.findMany(userId);
    }
}
