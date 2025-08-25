import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { ExceptionFilter } from './common/filters/exception.filter';
import { setupSwagger } from './common/swagger';

const API_VERSION = '1';
const PREFIX = 'api';
const BASE_PATH = `${PREFIX}/v${API_VERSION}`;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(app.get(ExceptionFilter));
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

    app.setGlobalPrefix(PREFIX);
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: API_VERSION,
    });

    setupSwagger(app, `${BASE_PATH}/docs`, Number(API_VERSION).toFixed(1));

    await app.listen(process.env.PORT || 5000);
}

bootstrap().catch((error) => {
    console.error('Bootstrap error:', error);
});
