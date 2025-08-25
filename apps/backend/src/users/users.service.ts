import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/requests.dto';
import { UserProfileResponseDto } from './dto/responses.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
    ) {}

    transformUserDataToProfile(user: User): UserProfileResponseDto {
        return {
            country: user.country,
            username: user.username,
            email: user.email,
            phone: user.phone,
        };
    }

    async create(createUserDto: CreateUsersDto): Promise<User> {
        const exitingUser = await this.findByEmailOrPhone(
            createUserDto.email,
            createUserDto.phone
        );

        if (exitingUser?.email === createUserDto.email) {
            throw new ConflictException('User with this email already exists');
        }

        if (exitingUser?.phone === createUserDto.phone) {
            throw new ConflictException('User with this phone number already exists');
        }

        return this.usersRepository.save(createUserDto);
    }

    async findByEmailOrPhone(email: string, phone: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: [{ email }, { phone }],
        });
    }
}
