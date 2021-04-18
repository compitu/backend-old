import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateTaskDto} from './create-task.dto';
import {Task as TaskEntity} from './task.entity';

@Injectable()
export class TaskService {
    public constructor(
        @InjectModel(TaskEntity.name) private taskModel: Model<TaskEntity>
    ) {}

    public findAll(): Promise<TaskEntity[]> {
        return this.taskModel.find().exec();
    }

    public async create(createCatDto: CreateTaskDto): Promise<TaskEntity> {
        const createdTask = new this.taskModel(createCatDto);
        return createdTask.save();
    }
}
