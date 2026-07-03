import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './config/prisma.service.js';
import { BranchesModule } from './modules/branches/branches.module.js';
import { CategoriesModule } from './modules/categories/categories.module.js';
import { ProductsModule } from './modules/products/products.module.js';
import { ShelvesModule } from './modules/shelves/shelves.module.js';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		BranchesModule,
		CategoriesModule,
		ProductsModule,
		ShelvesModule,
	],
	controllers: [],
	providers: [PrismaService],
	exports: [PrismaService],
})
export class AppModule {}
