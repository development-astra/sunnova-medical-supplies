import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private cart: CartService) {}

  @Get() getCart(@CurrentUser() user: any) { return this.cart.getOrCreate(user.id); }

  @Post('items') addItem(@CurrentUser() user: any, @Body() body: any) {
    return this.cart.addItem(user.id, body.productId, body.variantId, body.quantity ?? 1);
  }

  @Patch('items/:id') updateItem(@CurrentUser() user: any, @Param('id') id: string, @Body() body: any) {
    return this.cart.updateItem(user.id, id, body.quantity);
  }

  @Delete('items/:id') removeItem(@CurrentUser() user: any, @Param('id') id: string) {
    return this.cart.removeItem(user.id, id);
  }

  @Delete() clearCart(@CurrentUser() user: any) { return this.cart.clearCart(user.id); }
}
