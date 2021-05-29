import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/auth.module';
import {ColorsModule} from './colors/colors.module';
import {DbModule} from './db.module';
import {envValidationSchema} from './env-validation-schema';
import {ProjectsModule} from './projects/projects.module';
import {TagsModule} from './tags/tags.module';
import {TasksModule} from './tasks/tasks.module';
import {UsersModule} from './users/users.module';

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `./environments/${ENV}.env`,
            validationSchema: envValidationSchema,
        }),
        DbModule,
        AuthModule,
        ColorsModule,
        UsersModule,
        ProjectsModule,
        TagsModule,
        TasksModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
