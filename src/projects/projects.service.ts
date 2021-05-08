import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateProjectDto} from './create-project.dto';
import {Project as ProjectEntity} from './project.entity';

@Injectable()
export class ProjectsService {
    public constructor(
        @InjectModel(ProjectEntity.name)
        private projectModel: Model<ProjectEntity>
    ) {}

    public async create(
        createProjectDto: CreateProjectDto
    ): Promise<ProjectEntity> {
        const createdProject = new this.projectModel(createProjectDto);
        return createdProject.save();
    }

    public async findMany(userId: string): Promise<ProjectEntity[]> {
        return this.projectModel.find({userId}).exec();
    }
}
