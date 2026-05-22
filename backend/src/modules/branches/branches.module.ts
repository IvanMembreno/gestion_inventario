import { Module } from '@nestjs/common';
import { BranchesController } from './branches.controller.js';
import { BranchesService } from './branches.service.js';
import { PrismaService } from '../../config/prisma.service.js'; // Según se puede eliminar, pero de momento quedará asi hasta que lo compruebe mejor

@Module({
	controllers: [BranchesController],
	providers: [BranchesService, PrismaService], // Según no necesita PrismaService aquí, porque NestJS lo tomará del contexto global o de los imports
	exports: [BranchesService],
})
export class BranchesModule {}
