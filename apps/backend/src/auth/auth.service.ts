import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import isNumber from 'lodash/isNumber';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { RegisterDto, LoginDto, LogoutDto } from './dto/requests.dto';
import { TokensResponseDto, RegisterResponseDto, LoginResponseDto } from './dto/responses.dto';
import { JWTSignDto, JWTVerifyResponseDto } from './dto/types';
import { Session } from './entities/session.entity';

const USER_MAX_SESSIONS = 3;
const JWT_ACCESS_TTL = process.env.JWT_ACCESS_TTL || '2h';
const JWT_REFRESH_TTL = process.env.JWT_REFRESH_TTL || '7d';

const ms = (time: string | number): number => {
    if (isNumber(time)) {
        return time;
    }

    const match = /^(\d+)([smhdw])$/.exec(time.trim());

    if (!match) {
        throw new Error(`Invalid time format: ${time}`);
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
    case 's': return value * 1000;
    case 'm': return value * 60 * 1000;
    case 'h': return value * 60 * 60 * 1000;
    case 'd': return value * 24 * 60 * 60 * 1000;
    case 'w': return value * 7 * 24 * 60 * 60 * 1000;
    default: throw new Error(`Unknown unit: ${unit}`);
    }
};

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        @InjectRepository(Session) private readonly sessionsRepository: Repository<Session>,
    ) {}

    async hashData(data: string): Promise<string> {
        return await bcrypt.hash(data, 10);
    }

    async verifyToken(token: string): Promise<JWTVerifyResponseDto> {
        return await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
    }

    async generateTokens(payload: JWTSignDto): Promise<TokensResponseDto> {
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: JWT_ACCESS_TTL,
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: JWT_REFRESH_TTL,
        });

        return { accessToken, refreshToken };
    }

    async createSession(user: User, tokens: TokensResponseDto): Promise<Session> {
        const hashedRefreshToken = await this.hashData(tokens.refreshToken);

        const activeSessions = await this.sessionsRepository.find({
            where: { user: { id: user.id } },
            order: { createdAt: 'ASC' },
        });

        if (activeSessions.length >= USER_MAX_SESSIONS) {
            await this.sessionsRepository.delete(activeSessions[0].id);
        }

        return this.sessionsRepository.save({
            user,
            refreshToken: hashedRefreshToken,
            expiresAt: new Date(Date.now() + ms(JWT_REFRESH_TTL)),
        });
    }

    async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
        const hashedPassword = await this.hashData(registerDto.password);

        const newUser = await this.usersService.create({
            ...registerDto,
            password: hashedPassword,
        });

        const tokens = await this.generateTokens({
            id: newUser.id,
            email: newUser.email,
        });

        await this.createSession(newUser, tokens);

        return {
            profile: this.usersService.transformUserDataToProfile(newUser),
            tokens,
        };
    }

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        const user = await this.usersService.findByEmailOrPhone(
            loginDto.email,
            '',
        );

        if (!user) {
            throw new UnauthorizedException('error.wrongEmailOrPassword');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('error.wrongEmailOrPassword');
        }

        const tokens = await this.generateTokens({
            id: user.id,
            email: user.email,
        });

        await this.createSession(user, tokens);

        return {
            profile: this.usersService.transformUserDataToProfile(user),
            tokens,
        };
    }

    async logout(logoutDto: LogoutDto) {
        const payload = await this.verifyToken(logoutDto.refreshToken);

        const sessions = await this.sessionsRepository.find({
            where: { user: { id: payload.id } },
        });

        for (const session of sessions) {
            if (await bcrypt.compare(logoutDto.refreshToken, session.refreshToken)) {
                await this.sessionsRepository.delete(session.id);
                break;
            }
        }
    }

    async logoutFromAllDevices(logoutDto: LogoutDto) {
        const payload = await this.verifyToken(logoutDto.refreshToken);

        await this.sessionsRepository.delete({
            user: { id: payload.id },
        });
    }
}
