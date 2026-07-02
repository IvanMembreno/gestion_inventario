import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service.js';
import { CreateShelfDto } from './dto/create-shelf.dto.js';
import { UpdateShelfDto } from './dto/update-shelf.dto.js';
import { CreateShelfSlotDto } from './dto/create-shelf-slot.dto.js';
import { UpdateShelfSlotDto } from './dto/update-shelf-slot.dto.js';

@Injectable()
export class ShelvesService {
	constructor(private readonly prisma: PrismaService) {}

	// servicios de estantes
	async createShelf(dto: CreateShelfDto) {
		const exist = await this.prisma.shelf.findUnique({
			where: { name_branchId: { name: dto.name, branchId: dto.branchId } },
		});

		if (exist) {
			throw new ConflictException(`Ya existe un estante con el nombre '${dto.name}'`);
		}

		return this.prisma.shelf.create({ data: dto });
	}

	async findAllShelves(branchId: string) {
		return this.prisma.shelf.findMany({
			where: { branchId },
			include: { slots: true },
			orderBy: { name: 'asc' },
		});
	}

	async findOneShelf(id: string) {
		const shelf = await this.prisma.shelf.findUnique({
			where: { id },
			include: { slots: true },
		});

		if (!shelf) {
			throw new NotFoundException(`Estante '${id}'`);
		}

		return shelf;
	}

	async updateShelf(id: string, dto: UpdateShelfDto) {
		await this.findOneShelf(id);
		return this.prisma.shelf.update({
			where: { id },
			data: dto,
		});
	}

	async removeShelf(id: string) {
		await this.findOneShelf(id);
		return this.prisma.shelf.delete({ where: { id } });
	}

	// Servicios de slots
	async createSlot(dto: CreateShelfSlotDto) {
		const exist = await this.prisma.shelfSlot.findUnique({
			where: { code_shelfId: { code: dto.code, shelfId: dto.shelfId } },
		});

		if (exist) {
			throw new ConflictException(`La casilla '${dto.code}' ya existe en este estante`);
		}

		return this.prisma.shelfSlot.create({ data: dto });
	}

	async findAllSlots(shelfId: string) {
		await this.findOneShelf(shelfId);
		return this.prisma.shelfSlot.findMany({
			where: { shelfId },
			orderBy: { code: 'asc' },
		});
	}

	async findOneSlot(id: string) {
		const slot = await this.prisma.shelfSlot.findUnique({
			where: { id },
			include: { products: true },
		});

		if (!slot) {
			throw new NotFoundException(`Casilla '${id}' no encontrada`);
		}

		return slot;
	}

	async updateSlot(id: string, dto: UpdateShelfSlotDto) {
		await this.findOneSlot(id);
		return this.prisma.shelfSlot.update({ where: { id }, data: dto });
	}

	async removeSlot(id: string) {
		await this.findOneSlot(id);
		return this.prisma.shelfSlot.delete({ where: { id } });
	}
}
