import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {CreateTaskDto} from './create-task.dto';
import {Task} from './task.entity';
import {TasksService} from './tasks.service';

@Controller()
export class TasksController {
    public constructor(private readonly taskService: TasksService) {}

    @UseGuards(JwtAuthGuard)
    @Post('tasks')
    async create(@Body() createTaskDto: CreateTaskDto): Promise<void> {
        await this.taskService.create(createTaskDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('users/:userId/tasks')
    async findById(@Param('userId') userId: string): Promise<Task[]> {
        return this.taskService.findByUserId(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('tags/:tagId/tasks')
    async findByTag(@Param('tagId') tagId: string): Promise<Task[]> {
        return this.taskService.findByTagId(tagId);
    }
}
