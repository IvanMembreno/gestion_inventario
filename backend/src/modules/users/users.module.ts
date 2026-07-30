import { Module } from '@nestjs/common';
import { UsersConstroller } from './users.controller.js';
import { UsersService } from './users.service.js';
import { PrismaService } from '../../config/prisma.service.js';

@Module({
	controllers: [UsersConstroller],
	providers: [UsersService, PrismaService],
	exports: [UsersService],
})
export class UsersModule {}
