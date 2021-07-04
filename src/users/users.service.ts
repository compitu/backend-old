import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import {Model} from 'mongoose';
import {User} from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(user: User): Promise<User> {
        return this.userModel.create(user);
    }

    async update(user: {
        id: string;
        name: string;
        email: string;
        password?: string;
    }): Promise<User> {
        await this.userModel.updateOne({_id: user.id}, user);
        return this.userModel.findById(user.id);
    }

    async changePassword(data: {
        userId: string;
        oldPass: string;
        newPass: string;
    }): Promise<User> {
        const user = await this.userModel.findById(data.userId);
        const passwordsAreSame = await bcrypt.compare(
            data.oldPass,
            user.password
        );

        if (!passwordsAreSame) {
            throw new UnauthorizedException();
        }

        const newHashedPass = await bcrypt.hash(data.newPass, 12);

        await this.userModel.updateOne(
            {_id: data.userId},
            {password: newHashedPass}
        );
        return this.userModel.findById(user.id);
    }

    async findById(id: string): Promise<User> {
        return this.userModel.findById(id);
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email});
    }

    public fromDb(user: User): Pick<User, 'id' | 'name' | 'email'> {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
        };
    }
}
