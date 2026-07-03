import { Controller, Get, Patch, Delete, Param, Body, Query, Post } from '@nestjs/common';
import { ShelvesService } from './shelves.service.js';
import { CreateShelfDto } from './dto/create-shelf.dto.js';
import { UpdateShelfDto } from './dto/update-shelf.dto.js';
import { CreateShelfSlotDto } from './dto/create-shelf-slot.dto.js';
import { UpdateShelfSlotDto } from './dto/update-shelf-slot.dto.js';

@Controller('shelves')
export class ShelvesController {
	constructor(private readonly shelvesService: ShelvesService) {}

	@Post()
	createShelf(@Body() dto: CreateShelfDto) {
		return this.shelvesService.createShelf(dto);
	}

	@Get()
	findAllShelves(@Query('branchId') branchId: string) {
		return this.shelvesService.findAllShelves(branchId);
	}

	@Get(':id')
	findOneShelf(@Param('id') id: string) {
		return this.shelvesService.findOneShelf(id);
	}

	@Patch(':id')
	updateShelf(@Param('id') id: string, @Body() dto: UpdateShelfDto) {
		return this.shelvesService.updateShelf(id, dto);
	}

	@Delete(':id')
	removeShelf(@Param('id') id: string) {
		return this.shelvesService.removeShelf(id);
	}

	@Post('slots')
	createSlot(@Body() dto: CreateShelfSlotDto) {
		return this.shelvesService.createSlot(dto);
	}

	@Get(':id/slots')
	findAllSlots(@Param('id') id: string) {
		return this.shelvesService.findAllSlots(id);
	}

	@Get('slots/:id')
	findOneSlot(@Param('id') id: string) {
		return this.shelvesService.findOneSlot(id);
	}

	@Patch('slots/:id')
	updateSlot(@Param('id') id: string, @Body() dto: UpdateShelfSlotDto) {
		return this.shelvesService.updateSlot(id, dto);
	}

	@Delete('slots/:id')
	deleteSlot(@Param('id') id: string) {
		return this.shelvesService.removeSlot(id);
	}
}
