import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionFilter } from './common/filters/exception.filter';

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

    const config = new DocumentBuilder()
        .setTitle('Flowmerce API')
        .setVersion(Number(API_VERSION).toFixed(1))
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(
        `${BASE_PATH}/docs`,
        app,
        document,
        {
            customSiteTitle: 'Flowmerce API docs',
        },
    );

    await app.listen(process.env.PORT || 5000);
}

bootstrap().catch((error) => {
    console.error('Bootstrap error:', error);
});
