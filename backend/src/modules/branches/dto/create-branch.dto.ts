import { IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateBranchDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	name: string;

	@IsString()
	@IsOptional()
	address?: string;
}
