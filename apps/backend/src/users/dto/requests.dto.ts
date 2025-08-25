import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersDto {
    @ApiProperty({ required: true })
        username: string;

    @ApiProperty({ required: true })
        country: string;

    @ApiProperty({ required: true })
        email: string;

    @ApiProperty({ required: true })
        phone: string;

    @ApiProperty({ required: true })
        password: string;
}
