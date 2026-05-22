import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service.js';
import { CreateBranchDto } from './dto/create-branch.dto.js';
import { UpdateBranchDto } from './dto/update-branch.dto.js';

@Injectable()
export class BranchesService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateBranchDto) {
		return this.prisma.branch.create({
			data: {
				name: dto.name,
				address: dto.address,
			},
		});
	}

	async findAll() {
		return this.prisma.branch.findMany({
			where: { isActive: true },
			orderBy: { createdAt: 'desc' },
		});
	}

	async findOne(id: string) {
		const branch = await this.prisma.branch.findUnique({
			/* Si la clave y la variable se llaman igual, se puede poner solo la variable: {id: id} = { id } */
			where: { id },
		});

		if (!branch) {
			throw new NotFoundException(`Sucursal con id { ${id} } no encontrada`);
		}

		return branch;
	}

	async update(id: string, dto: UpdateBranchDto) {
		await this.findOne(id);

		return this.prisma.branch.update({
			where: { id },
			data: dto,
		});
	}

	async remove(id: string) {
		await this.findOne(id);

		return this.prisma.branch.update({
			where: { id },
			data: { isActive: false },
		});
	}
}
