import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ProjectSchema, Tag} from './tag.entity';
import {TagsController} from './tags.controller';
import {TagsService} from './tags.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Tag.name,
                schema: ProjectSchema,
            },
        ]),
    ],
    controllers: [TagsController],
    providers: [TagsService],
})
export class TagsModule {}
