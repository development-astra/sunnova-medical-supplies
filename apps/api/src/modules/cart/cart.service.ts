import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getOrCreate(userId: string) {
    let cart = await this.prisma.cart.findFirst({
      where: { userId, status: 'ACTIVE' },
      include: {
        items: {
          include: {
            product: { select: { id: true, name: true, slug: true, sku: true, imageUrl: true } },
            variant: { select: { id: true, name: true, sku: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId, status: 'ACTIVE' },
        include: { items: true },
      });
    }
    return cart;
  }

  async addItem(userId: string, productId: string, variantId: string | undefined, quantity: number) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');
    if (quantity < 1) throw new BadRequestException('Quantity must be at least 1');

    const cart = await this.getOrCreate(userId);
    const existing = await this.prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId, variantId: variantId ?? null },
    });

    if (existing) {
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    }

    const price = variantId
      ? (await this.prisma.productVariant.findUnique({ where: { id: variantId } }))?.price ?? product.price
      : product.price;

    return this.prisma.cartItem.create({
      data: { cartId: cart.id, productId, variantId: variantId ?? null, quantity, priceAtAdd: price },
    });
  }

  async updateItem(userId: string, itemId: string, quantity: number) {
    const cart = await this.getOrCreate(userId);
    if (quantity === 0) return this.prisma.cartItem.deleteMany({ where: { id: itemId, cartId: cart.id } });
    return this.prisma.cartItem.updateMany({ where: { id: itemId, cartId: cart.id }, data: { quantity } });
  }

  async removeItem(userId: string, itemId: string) {
    const cart = await this.getOrCreate(userId);
    return this.prisma.cartItem.deleteMany({ where: { id: itemId, cartId: cart.id } });
  }

  async clearCart(userId: string) {
    const cart = await this.getOrCreate(userId);
    return this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }
}
