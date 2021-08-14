import {ValidationPipe} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import {AppModule} from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const frontendBaseUrl = configService.get('FRONTEND_BASE_URL');
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({skipMissingProperties: true}));
    app.use(cookieParser());
    app.enableCors({origin: frontendBaseUrl, credentials: true});
    await app.listen(3000);
}

bootstrap();
