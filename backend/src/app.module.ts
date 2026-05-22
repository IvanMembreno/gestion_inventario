import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './config/prisma.service.js';
import { BranchesModule } from './modules/branches/branches.module.js';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		BranchesModule,
	],
	controllers: [],
	providers: [PrismaService],
	exports: [PrismaService],
})
export class AppModule {}
