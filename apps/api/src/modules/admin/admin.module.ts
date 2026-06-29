import { Module } from '@nestjs/common';
import { AdminProductsController } from './admin-products.controller';
import { AdminOrdersController } from './admin-orders.controller';
import { AdminQuotesController } from './admin-quotes.controller';
import { AdminUsersController } from './admin-users.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminProductsController, AdminOrdersController, AdminQuotesController, AdminUsersController],
  providers: [AdminService],
})
export class AdminModule {}
