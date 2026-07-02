import { IsOptional, IsString } from 'class-validator';

export class UpdateShelfSlotDto {
	@IsString()
	@IsOptional()
	code?: string;

	@IsString()
	@IsOptional()
	notes?: string;
}
