import { Controller, Get, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AdminService } from './admin.service';

@ApiTags('Admin — Orders')
@ApiBearerAuth()
@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
@Controller('admin/orders')
export class AdminOrdersController {
  constructor(private admin: AdminService) {}

  @Get() list(@Query('page') page?: number, @Query('status') status?: string) { return this.admin.listOrders(page, undefined, status); }
  @Patch(':id/status') updateStatus(@Param('id') id: string, @Body() body: { status: string }) { return this.admin.updateOrderStatus(id, body.status); }
}
