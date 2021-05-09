import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(user: User): Promise<User> {
        return this.userModel.create(user);
    }

    async findById(id: string): Promise<User> {
        return this.userModel.findById(id);
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email});
    }
}
