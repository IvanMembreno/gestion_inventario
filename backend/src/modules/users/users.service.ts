import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(dto: CreateUserDto) {
		const exists = await this.prismaService.user.findUnique({
			where: { email: dto.email },
		});

		if (exists) {
			throw new ConflictException(`El email '${dto.email}' ya está registrado`);
		}

		const passwordHash = await bcrypt.hash(dto.password, 12);

		return this.prismaService.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				passwordHash,
				role: dto.role,
				branchId: dto.branchId,
			},
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				isActive: true,
				createdAt: true,
				branchId: true,
			},
		});
	}

	async findAll(branchId?: string) {
		return this.prismaService.user.findMany({
			where: {
				isActive: true,
				...(branchId && { branchId }),
			},
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				isActive: true,
				createdAt: true,
				branchId: true,
			},
			orderBy: { name: 'asc' },
		});
	}

	async findOne(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				isActive: true,
				createdAt: true,
				branchId: true,
			},
		});

		if (!user) {
			throw new NotFoundException(`Usuario '${id}' no encontrado`);
		}

		return user;
	}

	async findByEmail(email: string) {
		return this.prismaService.user.findUnique({
			where: { email },
		});
	}

	async update(id: string, dto: UpdateUserDto) {
		await this.findOne(id);

		return this.prismaService.user.update({
			where: { id },
			data: dto,
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				isActive: true,
				createdAt: true,
				branchId: true,
			},
		});
	}

	async changePassword(id: string, newPassword: string) {
		await this.findOne(id);
		const passwordHash = await bcrypt.hash(newPassword, 12);

		return this.prismaService.user.update({
			where: { id },
			data: { passwordHash },
			select: { id: true },
		});
	}

	async remove(id: string) {
		await this.findOne(id);
		return this.prismaService.user.update({
			where: { id },
			data: { isActive: false },
			select: { id: true, isActive: true },
		});
	}
}
