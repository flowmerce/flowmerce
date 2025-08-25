import {Controller, Post, Body, HttpCode, HttpStatus} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ExceptionResponseDto } from '../common/dto/exception.dto';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, LogoutDto } from './dto/requests.dto';
import { RegisterResponseDto, LoginResponseDto } from './dto/responses.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Register new user'})
    @ApiCreatedResponse({ description: 'User registered', type: RegisterResponseDto })
    @ApiResponse({ type: ExceptionResponseDto, status: '4XX' })
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'User login'})
    @ApiOkResponse({ description: 'Logged in', type: LoginResponseDto })
    @ApiResponse({ type: ExceptionResponseDto, status: '4XX' })
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'User logout'})
    @ApiOkResponse({ description: 'Logged out' })
    @ApiResponse({ type: ExceptionResponseDto, status: '4XX' })
    async logout(@Body() logoutDto: LogoutDto) {
        return this.authService.logout(logoutDto);
    }

    @Post('logout-from-all-devices')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'User logout from all devices'})
    @ApiOkResponse({ description: 'Logged out from all devices' })
    @ApiResponse({ type: ExceptionResponseDto, status: '4XX' })
    async logoutFromAllDevices(@Body() logoutDto: LogoutDto) {
        return this.authService.logoutFromAllDevices(logoutDto);
    }
}
