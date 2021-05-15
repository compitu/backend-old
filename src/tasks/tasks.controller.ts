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
import {CreateTaskDto} from './create-task.dto';
import {TaskResponse, TasksService} from './tasks.service';

@Controller()
export class TasksController {
    public constructor(private readonly taskService: TasksService) {}

    @UseGuards(JwtAuthGuard)
    @Post('tasks')
    async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponse> {
        const task = await this.taskService.create(createTaskDto);
        return this.taskService.fromDb(task);
    }

    @UseGuards(JwtAuthGuard)
    @Get('users/:userId/tasks')
    async findById(@Param('userId') userId: string): Promise<TaskResponse[]> {
        const tasks = await this.taskService.findByUserId(userId);
        return tasks.map(task => this.taskService.fromDb(task));
    }

    @UseGuards(JwtAuthGuard)
    @Get('tags/:tagId/tasks')
    async findByTag(@Param('tagId') tagId: string): Promise<TaskResponse[]> {
        const tasks = await this.taskService.findByTagId(tagId);
        return tasks.map(task => this.taskService.fromDb(task));
    }

    @UseGuards(JwtAuthGuard)
    @Put('tasks/:id')
    async update(
        @Param('id') id: string,
        @Body() task: {id: string; name: string; colorId: string}
    ): Promise<TaskResponse> {
        const entity = await this.taskService.update(task);
        return this.taskService.fromDb(entity);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('tasks/:id')
    async delete(@Param('id') id: string): Promise<{id: string}> {
        const task = await this.taskService.delete(id);
        return {id: task._id};
    }
}
