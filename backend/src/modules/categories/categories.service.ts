import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Injectable()
export class CategoriesService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateCategoryDto) {
		const exists = await this.prisma.category.findUnique({
			where: { name: dto.name },
		});

		if (exists) {
			throw new ConflictException(`La categoría '${dto.name}' ya existe`);
		}

		return this.prisma.category.create({ data: dto });
	}

	async findAll() {
		return this.prisma.category.findMany({
			orderBy: { name: 'asc' },
		});
	}

	async findOne(id: string) {
		const category = await this.prisma.category.findUnique({
			where: { id },
		});

		if (!category) {
			throw new NotFoundException(`Categoría con id '${id}' no encontrada`);
		}

		return category;
	}

	async update(id: string, dto: UpdateCategoryDto) {
		await this.findOne(id);

		return this.prisma.category.update({
			where: { id },
			data: dto,
		});
	}

	async remove(id: string) {
		await this.findOne(id);

		return this.prisma.category.delete({
			where: { id },
		});
	}
}
