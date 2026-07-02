import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Injectable()
export class ProductsService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateProductDto) {
		const skuExists = await this.prisma.product.findUnique({
			where: { sku: dto.sku },
		});

		if (skuExists) {
			throw new ConflictException(`El SKU '${dto.sku}' ya está registrado`);
		}

		return this.prisma.$transaction(async (tx) => {
			const product = await tx.product.create({
				data: {
					name: dto.name,
					description: dto.description,
					sku: dto.sku,
					barcode: dto.barcode,
					imageUrl: dto.imageUrl,
					categoryId: dto.categoryId,
				},
			});

			await tx.branchProduct.create({
				data: {
					productId: product.id,
					branchId: dto.branchId,
					shelfSlotId: dto.shelfSlotId,
					price: dto.price,
					stock: dto.stock ?? 0,
					minStock: dto.minStock ?? 0,
				},
			});

			return tx.product.findUnique({
				where: { id: product.id },
				include: { branches: true, category: true },
			});
		});
	}

	async findAll(branchId: string) {
		return this.prisma.branchProduct.findMany({
			where: { branchId, isActive: true },
			include: {
				product: {
					include: { category: true },
				},
			},
			orderBy: { product: { name: 'asc' } },
		});
	}

	async findOne(id: string, branchId: string) {
		const branchProduct = await this.prisma.branchProduct.findUnique({
			where: { productId_branchId: { productId: id, branchId } },
			include: {
				product: { include: { category: true } },
			},
		});

		if (!branchProduct) {
			throw new NotFoundException(`Producto '${id}' no encontrado en esta sucursal`);
		}

		return branchProduct;
	}

	async update(id: string, branchId: string, dto: UpdateProductDto) {
		await this.findOne(id, branchId);

		return this.prisma.$transaction(async (tx) => {
			if (
				dto.name !== undefined ||
				dto.description !== undefined ||
				dto.sku !== undefined ||
				dto.barcode !== undefined ||
				dto.imageUrl !== undefined ||
				dto.categoryId !== undefined
			) {
				await tx.product.update({
					where: { id },
					data: {
						name: dto.name,
						description: dto.description,
						sku: dto.sku,
						barcode: dto.barcode,
						imageUrl: dto.imageUrl,
						categoryId: dto.categoryId,
					},
				});
			}

			if (
				dto.shelfSlotId !== undefined ||
				dto.price !== undefined ||
				dto.stock !== undefined ||
				dto.minStock !== undefined
			) {
				await tx.branchProduct.update({
					where: { productId_branchId: { productId: id, branchId } },
					data: {
						shelfSlotId: dto.shelfSlotId,
						price: dto.price,
						stock: dto.stock,
						minStock: dto.minStock,
					},
				});
			}

			return tx.product.findUnique({
				where: { id },
				include: { branches: true, category: true },
			});
		});
	}

	async remove(id: string, branchId: string) {
		await this.findOne(id, branchId);

		return this.prisma.branchProduct.update({
			where: { productId_branchId: { productId: id, branchId } },
			data: { isActive: false },
		});
	}
}
