import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAllForUser(userId: string, page = 1, limit = 20) {
    const [items, total] = await Promise.all([
      this.prisma.order.findMany({
        where: { userId },
        include: { items: { include: { product: { select: { name: true, imageUrl: true } } } } },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: (page - 1) * limit,
      }),
      this.prisma.order.count({ where: { userId } }),
    ]);
    return { items, total, page, limit };
  }

  async findOneForUser(id: string, userId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id, userId },
      include: {
        items: { include: { product: { select: { name: true, slug: true, imageUrl: true, sku: true } }, variant: true } },
        shippingAddress: true,
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async createFromCart(userId: string, cartId: string, addressId: string, paymentIntentId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { product: true, variant: true } } },
    });
    if (!cart || cart.userId !== userId) throw new NotFoundException('Cart not found');

    const subtotal = cart.items.reduce((sum, i) => sum + Number(i.priceAtAdd) * i.quantity, 0);
    const tax = subtotal * 0.07;
    const total = subtotal + tax;
    const orderNumber = `SN-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;

    const order = await this.prisma.order.create({
      data: {
        userId,
        orderNumber,
        status: 'CONFIRMED',
        subtotal,
        tax,
        shipping: 0,
        total,
        shippingAddressId: addressId,
        paymentIntentId,
        items: {
          create: cart.items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId,
            quantity: i.quantity,
            unitPrice: Number(i.priceAtAdd),
            totalPrice: Number(i.priceAtAdd) * i.quantity,
            productName: i.product.name,
            productSku: i.variant?.sku ?? i.product.sku,
          })),
        },
      },
      include: { items: true },
    });

    await this.prisma.cart.update({ where: { id: cartId }, data: { status: 'CONVERTED' } });
    return order;
  }
}
