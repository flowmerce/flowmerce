import {
    ExceptionFilter as DefaultExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nContext, I18nService } from 'nestjs-i18n';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import { ExceptionResponseDto } from '../dto/exception.dto';

@Catch()
export class ExceptionFilter implements DefaultExceptionFilter {
    constructor(private readonly i18n: I18nService) {}

    async catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const i18nContext = I18nContext.current(host);
        const lang = i18nContext?.lang || 'en';

        const exceptionResponse: ExceptionResponseDto = {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: '',
        };

        if (exception instanceof HttpException) {
            exceptionResponse.statusCode = exception.getStatus();
            const res = exception.getResponse();

            if (isString(res)) {
                exceptionResponse.message = await this.i18n.translate(res || exception.message, { lang });
            } else if ('message' in res) {
                if (isArray(res.message)) {
                    exceptionResponse.message = await Promise.all(
                        res.message.map((msg: string, idx: number) => {
                            let constraints: any;

                            if ('errors' in res && isArray(res.errors)) {
                                constraints = res?.errors?.[idx]?.constraints;
                            }

                            return this.i18n.translate(msg, { lang, args: constraints });
                        }),
                    ) as string[];
                } else {
                    exceptionResponse.message = await this.i18n.translate(res.message as string || exception.message, { lang });
                }
            }
        } else if (exception instanceof Error) {
            exceptionResponse.message = await this.i18n.translate(exception.message, { lang });
        }

        response.status(exceptionResponse.statusCode).json(exceptionResponse);
    }
}

