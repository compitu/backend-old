import {Body, Controller, Get, Post} from '@nestjs/common';
import {CreateTaskDto} from './create-task.dto';
import {Task} from './task.entity';
import {TaskService} from './task.service';

@Controller('tasks')
export class TaskController {
    public constructor(private readonly taskService: TaskService) {}

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto): Promise<void> {
        await this.taskService.create(createTaskDto);
    }

    @Get()
    async findAll(): Promise<Task[]> {
        return this.taskService.findAll();
    }
}
