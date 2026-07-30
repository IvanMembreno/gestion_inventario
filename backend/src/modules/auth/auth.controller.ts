import { Controller, Post, Body, Res, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtRefreshGuard } from '../common/guards/jwt-refresh.guard.js';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
		const { accessToken, refreshToken, user } = await this.authService.login(dto);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		return { accessToken, user };
	}

	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtRefreshGuard)
	async refresh(@Req() req: Request) {
		const token = req.cookies?.refreshToken as string;
		return this.authService.refreshToken(token);
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie('refreshToken');
		return { message: 'Sesión cerrada' };
	}
}
