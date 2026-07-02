import { IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateShelfDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	name!: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsUUID()
	@IsNotEmpty()
	branchId!: string;
}
