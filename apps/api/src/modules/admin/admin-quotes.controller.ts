import { Controller, Get, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AdminService } from './admin.service';

@ApiTags('Admin — Quotes')
@ApiBearerAuth()
@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
@Controller('admin/quotes')
export class AdminQuotesController {
  constructor(private admin: AdminService) {}

  @Get() list(@Query('status') status?: string) { return this.admin.listQuotes(status); }
  @Patch(':id') update(@Param('id') id: string, @Body() body: { status: string; adminNotes?: string }) {
    return this.admin.updateQuote(id, body.status, body.adminNotes);
  }
}
