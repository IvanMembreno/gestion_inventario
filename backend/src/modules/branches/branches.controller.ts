import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { BranchesService } from './branches.service.js';
import { CreateBranchDto } from './dto/create-branch.dto.js';
import { UpdateBranchDto } from './dto/update-branch.dto.js';

@Controller('branches')
export class BranchesController {
	constructor(private readonly branchesService: BranchesService) {}

	@Post()
	create(@Body() dto: CreateBranchDto) {
		return this.branchesService.create(dto);
	}

	@Get()
	findAll() {
		return this.branchesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.branchesService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateBranchDto) {
		return this.branchesService.update(id, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.branchesService.remove(id);
	}
}
