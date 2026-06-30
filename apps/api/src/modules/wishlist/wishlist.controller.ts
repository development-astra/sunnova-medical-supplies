import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WishlistService } from './wishlist.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Wishlist')
@Controller('wishlist')
export class WishlistController {
  constructor(private wishlist: WishlistService) {}

  @Get() list(@CurrentUser() user: any) { return this.wishlist.list(user.id); }

  @Post() add(@CurrentUser() user: any, @Body() body: { productId: string }) {
    return this.wishlist.add(user.id, body.productId);
  }

  @Delete(':productId') remove(@CurrentUser() user: any, @Param('productId') productId: string) {
    return this.wishlist.remove(user.id, productId);
  }
}
