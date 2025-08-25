import { IsEmail, IsString, IsNotEmpty, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { IsPhoneByCountry } from '../../common/decorators/validation/phoneNumber';

export class RegisterDto {
    @ApiProperty({ required: true, example: 'John Doe' })
    @IsString()
    @Length(3, 30)
        username: string;

    @ApiProperty({ required: true, example: 'UA' })
    @IsString()
    @Length(2, 2)
        country: string;

    @ApiProperty({ required: true, example: '0995628115' })
    @IsPhoneByCountry('country')
    @Transform(({ value, obj }) => {
        try {
            const phoneNumber = parsePhoneNumberFromString(value, obj.country);
            return phoneNumber ? phoneNumber.format('E.164') : value;
        } catch {
            return value;
        }
    })
        phone: string;

    @ApiProperty({ required: true, example: 'flowmerce.co@gmail.com' })
    @IsEmail()
        email: string;

    @ApiProperty({ required: true, example: 'StrongPassword123!' })
    @IsString()
    @Length(8, 40)
        password: string;
}

export class LoginDto {
    @ApiProperty({ required: true, example: 'flowmerce.co@gmail.com' })
    @IsEmail()
        email: string;

    @ApiProperty({ required: true, example: 'StrongPassword123!' })
    @IsString()
    @IsNotEmpty()
        password: string;
}

export class LogoutDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
        refreshToken: string;
}
