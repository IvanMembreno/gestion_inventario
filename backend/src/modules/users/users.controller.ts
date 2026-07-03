import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('users')
export class UsersConstroller {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(dto: CreateUserDto) {
		return this.usersService.create(dto);
	}

	@Get()
	findAll(@Query('branchId') branchId?: string) {
		return this.usersService.findAll(branchId);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return this.usersService.update(id, dto);
	}

	@Patch(':id/password')
	changePassword(@Param('id') id: string, @Body('password') password: string) {
		return this.usersService.changePassword(id, password);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(id);
	}
}
