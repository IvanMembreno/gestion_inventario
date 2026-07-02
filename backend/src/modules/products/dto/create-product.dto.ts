import {
	IsString,
	IsNumber,
	IsInt,
	IsUUID,
	IsPositive,
	IsNotEmpty,
	IsOptional,
	MinLength,
	Min,
} from 'class-validator';

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	name!: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	sku!: string;

	@IsString()
	@IsOptional()
	barcode?: string;

	@IsString()
	@IsOptional()
	imageUrl?: string;

	@IsUUID()
	@IsNotEmpty()
	categoryId!: string;

	@IsUUID()
	@IsOptional()
	shelfSlotId?: string;

	@IsUUID()
	@IsNotEmpty()
	branchId!: string;

	@IsNumber({ maxDecimalPlaces: 2 })
	@IsPositive()
	price!: number;

	@IsInt()
	@IsOptional()
	@Min(0)
	stock?: number;

	@IsInt()
	@IsOptional()
	@Min(0)
	minStock?: number;
}
