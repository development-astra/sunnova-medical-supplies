import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AdminService } from './admin.service';

@ApiTags('Admin — Categories')
@ApiBearerAuth()
@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
@Controller('admin/categories')
export class AdminCategoriesController {
  constructor(private admin: AdminService) {}

  @Get() list() { return this.admin.listCategories(); }
  @Post() upsert(@Body() body: any) { return this.admin.upsertCategory(body); }
  @Delete(':id') remove(@Param('id') id: string) { return this.admin.deleteCategory(id); }
}
