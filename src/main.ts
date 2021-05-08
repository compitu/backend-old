import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import {AppModule} from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({skipMissingProperties: true}));
    app.use(cookieParser());
    app.enableCors({origin: 'http://localhost:4200', credentials: true});
    await app.listen(3000);
}

bootstrap();
