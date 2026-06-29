import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AdminService } from './admin.service';

@ApiTags('Admin — Products')
@ApiBearerAuth()
@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
@Controller('admin/products')
export class AdminProductsController {
  constructor(private admin: AdminService) {}

  @Get() list(@Query('page') page?: number, @Query('limit') limit?: number) { return this.admin.listProducts(page, limit); }
  @Post() upsert(@Body() body: any) { return this.admin.upsertProduct(body); }
  @Delete(':id') remove(@Param('id') id: string) { return this.admin.deleteProduct(id); }
}
