import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CreateTaskDto} from './create-task.dto';
import {Task} from './task.entity';
import {TasksService} from './tasks.service';

@Controller()
export class TasksController {
    public constructor(private readonly taskService: TasksService) {}

    @Post('tasks')
    async create(@Body() createTaskDto: CreateTaskDto): Promise<void> {
        await this.taskService.create(createTaskDto);
    }

    @Get('projects/:projectId/tasks')
    async findMany(@Param('projectId') projectId: string): Promise<Task[]> {
        return this.taskService.findMany(projectId);
    }

    @Get('tags/:tagId/tasks')
    async findManyForTag(@Param('tagId') tagId: string): Promise<Task[]> {
        return this.taskService.findManyForTag(tagId);
    }
}
