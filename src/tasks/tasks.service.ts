import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateTaskDto} from './create-task.dto';
import {Task as TaskEntity} from './task.entity';

export interface TaskResponse {
    id: string;
    name: string;
    done: boolean;
    projectId: string;
    due?: Date;
    tags?: string[];
}

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

    public async update(task: {
        id: string;
        name: string;
        colorId: string;
    }): Promise<TaskEntity> {
        await this.taskModel.updateOne({_id: task.id}, task);
        return this.taskModel.findById(task.id);
    }

    public async delete(id: string): Promise<TaskEntity> {
        return this.taskModel.findByIdAndDelete(id);
    }

    public fromDb(task: TaskEntity): TaskResponse {
        return {
            id: task._id,
            name: task.name,
            done: task.done,
            projectId: task.projectId,
            due: task.due,
            tags: task.tags,
        };
    }
}
