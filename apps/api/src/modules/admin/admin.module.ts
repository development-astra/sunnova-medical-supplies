import { Module } from '@nestjs/common';
import { AdminDashboardController } from './admin-dashboard.controller';
import { AdminProductsController } from './admin-products.controller';
import { AdminOrdersController } from './admin-orders.controller';
import { AdminQuotesController } from './admin-quotes.controller';
import { AdminUsersController } from './admin-users.controller';
import { AdminCategoriesController } from './admin-categories.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [
    AdminDashboardController,
    AdminProductsController,
    AdminOrdersController,
    AdminQuotesController,
    AdminUsersController,
    AdminCategoriesController,
  ],
  providers: [AdminService],
})
export class AdminModule {}
