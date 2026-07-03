import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';
import { Role } from '../../../generated/prisma/enums.js';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	name!: string;

	@IsEmail()
	@IsNotEmpty()
	email!: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password!: string;

	@IsEnum(Role)
	@IsNotEmpty()
	role!: Role;

	@IsUUID()
	@IsNotEmpty()
	branchId!: string;
}
