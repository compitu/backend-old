import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateTaskDto} from './create-task.dto';
import {Task as TaskEntity} from './task.entity';

@Injectable()
export class TasksService {
    public constructor(
        @InjectModel(TaskEntity.name) private taskModel: Model<TaskEntity>
    ) {}

    public async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        const createdTask = new this.taskModel(createTaskDto);
        return createdTask.save();
    }

    public findMany(projectId: string): Promise<TaskEntity[]> {
        return this.taskModel.find({projectId}).exec();
    }

    public findByTagId(tagId: string): Promise<TaskEntity[]> {
        return this.taskModel.find().where({tags: tagId}).exec();
    }

    public findByUserId(userId: string): Promise<TaskEntity[]> {
        return this.taskModel.find({userId}).exec();
    }
}
