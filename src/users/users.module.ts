import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {SettingsModule} from '../settings/settings.module';
import {User, UserSchema} from './user.entity';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
        SettingsModule,
    ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
