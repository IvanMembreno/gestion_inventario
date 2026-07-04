import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service.js';
import { LoginDto } from './dto/login.dto.js';
import bcrypt from 'bcrypt';

interface JwtPayload {
	sub: string;
	email: string;
	role: string;
	branchId: string;
}

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async login(dto: LoginDto) {
		const user = await this.usersService.findByEmail(dto.email);

		if (!user) {
			throw new UnauthorizedException('Credenciales inválidas');
		}

		if (!user.isActive) {
			throw new UnauthorizedException('Usuario desactivado');
		}

		const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);

		if (!passwordMatch) {
			throw new UnauthorizedException('Credenciales inválidas');
		}

		const payload = {
			sub: user.id,
			email: user.email,
			role: user.role,
			branchId: user.branchId,
		};

		const accessToken = await this.jwtService.signAsync(payload, {
			secret: this.configService.get('JWT_ACCESS_SECRET'),
			expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
		});

		const refreshToken = await this.jwtService.signAsync(payload, {
			secret: this.configService.get('JWT_REFRESH_SECRET'),
			expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
		});

		return {
			accessToken,
			refreshToken,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
				branchId: user.branchId,
			},
		};
	}

	async refreshToken(token: string) {
		try {
			const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
				secret: this.configService.get('JWT_REFRESH_SECRET'),
			});

			const user = await this.usersService.findOne(payload.sub);

			const newPayload = {
				sub: user.id,
				email: user.email,
				role: user.role,
				branchId: user.branchId,
			};

			const accessToken = await this.jwtService.signAsync(newPayload, {
				secret: this.configService.get('JWT_ACCESS_SECRET'),
				expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
			});

			return { accessToken };
		} catch {
			throw new UnauthorizedException('Refresh token inválido o expirado');
		}
	}
}
