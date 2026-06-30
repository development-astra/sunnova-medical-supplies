import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AdminService } from './admin.service';

@ApiTags('Admin — Dashboard')
@ApiBearerAuth()
@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
@Controller('admin/dashboard')
export class AdminDashboardController {
  constructor(private admin: AdminService) {}

  @Get('stats')
  stats() {
    return this.admin.getDashboardStats();
  }
}
