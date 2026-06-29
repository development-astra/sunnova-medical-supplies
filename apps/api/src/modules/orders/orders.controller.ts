import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private orders: OrdersService) {}

  @Get() findAll(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.orders.findAllForUser(user.id, page, limit);
  }

  @Get(':id') findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.orders.findOneForUser(id, user.id);
  }
}
