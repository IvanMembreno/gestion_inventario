import {
	IsString,
	IsNumber,
	IsInt,
	IsUUID,
	IsPositive,
	IsOptional,
	MinLength,
	Min,
} from 'class-validator';

export class UpdateProductDto {
	@IsString()
	@MinLength(2)
	@IsOptional()
	name?: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsString()
	@MinLength(2)
	@IsOptional()
	sku?: string;

	@IsString()
	@IsOptional()
	barcode?: string;

	@IsString()
	@IsOptional()
	imageUrl?: string;

	@IsUUID()
	@IsOptional()
	categoryId?: string;

	@IsUUID()
	@IsOptional()
	shelfSlotId?: string;

	@IsNumber({ maxDecimalPlaces: 2 })
	@IsPositive()
	@IsOptional()
	price?: number;

	@IsInt()
	@Min(0)
	@IsOptional()
	stock?: number;

	@IsInt()
	@Min(0)
	@IsOptional()
	minStock?: number;
}
