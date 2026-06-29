import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(q: string, limit = 10) {
    if (!q || q.trim().length < 2) return { products: [], categories: [] };
    const term = q.trim();
    const [products, categories] = await Promise.all([
      this.prisma.product.findMany({
        where: {
          active: true,
          OR: [
            { name: { contains: term, mode: 'insensitive' } },
            { sku: { contains: term, mode: 'insensitive' } },
          ],
        },
        select: { id: true, name: true, slug: true, sku: true, imageUrl: true, price: true },
        take: limit,
      }),
      this.prisma.category.findMany({
        where: { active: true, name: { contains: term, mode: 'insensitive' } },
        select: { id: true, name: true, slug: true },
        take: 5,
      }),
    ]);
    return { products, categories };
  }
}
