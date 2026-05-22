import { IsString, IsOptional, IsBoolean, MinLength } from 'class-validator';

export class UpdateBranchDto {
	@IsString()
	@IsOptional()
	@MinLength(2)
	name?: string;

	@IsString()
	@IsOptional()
	address?: string;

	@IsBoolean()
	@IsOptional()
	isActive?: boolean;
}
