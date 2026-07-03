import { Module } from '@nestjs/common';
import { ShelvesController } from './shelves.controller.js';
import { ShelvesService } from './shelves.service.js';
import { PrismaService } from '../../config/prisma.service.js';

@Module({
	controllers: [ShelvesController],
	providers: [ShelvesService, PrismaService],
	exports: [ShelvesService],
})
export class ShelvesModule {}
