import { ApiProperty } from '@nestjs/swagger';
import { UserProfileResponseDto } from '../../users/dto/responses.dto';

export class TokensResponseDto {
    @ApiProperty()
        accessToken: string;

    @ApiProperty()
        refreshToken: string;
}

export class RegisterResponseDto {
    @ApiProperty()
        profile: UserProfileResponseDto;

    @ApiProperty()
        tokens: TokensResponseDto;
}

export class LoginResponseDto extends RegisterResponseDto {}
