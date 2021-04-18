import {Controller, Get} from '@nestjs/common';
import {TaskService} from './task.service';

@Controller()
export class TaskController {
    public constructor(private readonly taskService: TaskService) {}

    @Get()
    public getTasks(): string {
        return this.taskService.getTasks();
    }
}
