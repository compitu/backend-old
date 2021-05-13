import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateProjectDto} from './create-project.dto';
import {ProjectsResponse} from './project-response';
import {ProjectType} from './project-type';
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

    public async update(project: {
        id: string;
        name: string;
        colorId: string;
    }): Promise<ProjectEntity> {
        await this.projectModel.updateOne({_id: project.id}, project);
        return this.projectModel.findById(project.id);
    }

    public async delete(id: string): Promise<ProjectEntity> {
        return this.projectModel.findByIdAndDelete(id);
    }

    public async findMany(userId: string): Promise<ProjectsResponse> {
        const projectEntities = await this.projectModel.find({userId}).exec();
        const builtIn = projectEntities
            .filter(projects => projects.type === ProjectType.BUILT_IN)
            .map(project => ({
                id: project._id,
                name: project.name,
                icon: project.icon,
            }));
        const userProjects = projectEntities
            .filter(projects => projects.type === ProjectType.USER_PROJECT)
            .map(project => ({
                id: project._id,
                name: project.name,
                colorId: project.colorId,
            }));

        return {builtIn, userProjects};
    }
}
