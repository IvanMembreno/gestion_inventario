import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	create(@Body() dto: CreateProductDto) {
		return this.productsService.create(dto);
	}

	@Get()
	findAll(@Query('branchId') branchId: string) {
		return this.productsService.findAll(branchId);
	}

	@Get(':id')
	findOne(@Param('id') id: string, @Query('branchId') branchId: string) {
		return this.productsService.findOne(id, branchId);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Query('branchId') branchId: string,
		@Body() dto: UpdateProductDto,
	) {
		return this.productsService.update(id, branchId, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: string, @Query('branchId') branchId: string) {
		return this.productsService.remove(id, branchId);
	}
}
