import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ColorController} from './color.controller';
import {Color, ColorSchema} from './color.entity';
import {ColorsService} from './colors.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Color.name,
                schema: ColorSchema,
            },
        ]),
    ],
    controllers: [ColorController],
    providers: [ColorsService],
})
export class ColorsModule {}
