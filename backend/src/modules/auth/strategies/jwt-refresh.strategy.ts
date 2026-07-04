import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => (req?.cookies as Record<string, string>)?.refreshToken ?? null,
			]),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_REFRESH_SECRET')!,
			passReqToCallback: true,
		});
	}

	validate(req: Request, payload: { sub: string; email: string; role: string; branchId: string }) {
		const token = (req?.cookies as Record<string, string>)?.refreshToken;

		if (!token) {
			throw new UnauthorizedException('Refresh token no encontrado');
		}

		return payload;
	}
}
