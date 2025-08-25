import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class ExceptionResponseDto {
    @ApiProperty({ example: HttpStatus.UNAUTHORIZED })
        statusCode: number;

    @ApiProperty({
        description: 'Error message (string or array of strings)',
        oneOf: [
            { type: 'string', example: 'Invalid credentials' },
            {
                type: 'array',
                items: { type: 'string' },
                example: ['email must be an email', 'password is too short'],
            },
        ],
    })
        message: string | string[];
}