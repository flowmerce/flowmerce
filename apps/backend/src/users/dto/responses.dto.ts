import { OmitType } from '@nestjs/swagger';
import { CreateUsersDto } from './requests.dto';

export class UserProfileResponseDto extends OmitType(CreateUsersDto, [
    'password',
] as const) {}
