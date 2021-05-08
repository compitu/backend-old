import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Color as ColorEntity} from './color.entity';
import {CreateColorDto} from './create-color.dto';

@Injectable()
export class ColorsService {
    public constructor(
        @InjectModel(ColorEntity.name)
        private colorModel: Model<ColorEntity>
    ) {}

    public async create(
        createProjectDto: CreateColorDto
    ): Promise<ColorEntity> {
        const createdColor = new this.colorModel(createProjectDto);
        return createdColor.save();
    }

    public async findAll(): Promise<ColorEntity[]> {
        return this.colorModel.find().exec();
    }

    public async findOne(colorId: string): Promise<ColorEntity> {
        return this.colorModel.findById(colorId).exec();
    }
}
