import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(data: unknown): Promise<User> {
        return this.userModel.create(data);
    }

    async findOne(data: unknown): Promise<User> {
        return this.userModel.findOne(data);
    }
}
