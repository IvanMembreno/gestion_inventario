import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateShelfSlotDto {
	@IsString()
	@IsNotEmpty()
	code!: string;

	@IsString()
	@IsOptional()
	notes?: string;

	@IsUUID()
	@IsNotEmpty()
	shelfId!: string;
}
