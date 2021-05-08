import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateTagDto} from './create-tag.dto';
import {Tag as TagEntity} from './tag.entity';

@Injectable()
export class TagsService {
    public constructor(
        @InjectModel(TagEntity.name)
        private tagModel: Model<TagEntity>
    ) {}

    public async create(createTagDto: CreateTagDto): Promise<TagEntity> {
        const createdTag = new this.tagModel(createTagDto);
        return createdTag.save();
    }

    public async findMany(userId: string): Promise<TagEntity[]> {
        return this.tagModel.find({userId}).exec();
    }
}
