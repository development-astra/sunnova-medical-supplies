import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.review.findMany({
      where: { userId },
      include: {
        product: { select: { name: true, imageUrl: true, slug: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(
    userId: string,
    data: {
      productId: string;
      rating: number;
      title?: string;
      body?: string;
      orderId?: string;
    },
  ) {
    return this.prisma.review.create({
      data: { ...data, userId, status: 'PENDING' },
    });
  }

  async update(
    id: string,
    userId: string,
    data: { rating?: number; title?: string; body?: string },
  ) {
    const review = await this.prisma.review.findFirst({ where: { id, userId } });
    if (!review) throw new NotFoundException('Review not found');
    return this.prisma.review.update({
      where: { id },
      data: { ...data, status: 'PENDING' },
    });
  }

  async delete(id: string, userId: string) {
    const review = await this.prisma.review.findFirst({ where: { id, userId } });
    if (!review) throw new NotFoundException('Review not found');
    return this.prisma.review.delete({ where: { id } });
  }
}
