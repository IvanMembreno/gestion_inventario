import {
	IsBoolean,
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
	IsUUID,
	MinLength,
} from 'class-validator';
import { Role } from '../../../generated/prisma/enums.js';

export class UpdateUserDto {
	@IsString()
	@IsOptional()
	@MinLength(2)
	name?: string;

	@IsEmail()
	@IsOptional()
	email?: string;

	@IsEnum(Role)
	@IsOptional()
	role?: Role;

	@IsUUID()
	@IsOptional()
	branchId!: string;

	@IsBoolean()
	@IsOptional()
	isActive?: boolean;
}
