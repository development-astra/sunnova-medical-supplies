import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [users, products, orders, quotes, pendingQuotes, recentOrders] = await Promise.all([
      this.prisma.user.count({ where: { role: 'CUSTOMER' } }),
      this.prisma.product.count({ where: { active: true } }),
      this.prisma.order.count(),
      this.prisma.quote.count(),
      this.prisma.quote.count({ where: { status: 'PENDING' } }),
      this.prisma.order.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { user: { select: { email: true, firstName: true } } } }),
    ]);
    return { users, products, orders, quotes, pendingQuotes, recentOrders };
  }

  listProducts(page = 1, limit = 50) {
    return this.prisma.product.findMany({
      include: { category: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async upsertProduct(data: any) {
    if (data.id) return this.prisma.product.update({ where: { id: data.id }, data });
    return this.prisma.product.create({ data });
  }

  deleteProduct(id: string) {
    return this.prisma.product.update({ where: { id }, data: { active: false } });
  }

  listOrders(page = 1, limit = 50, status?: string) {
    const where: any = {};
    if (status) where.status = status;
    return this.prisma.order.findMany({
      where,
      include: { user: { select: { email: true, firstName: true, lastName: true } }, items: { take: 3 } },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  updateOrderStatus(id: string, status: string) {
    return this.prisma.order.update({ where: { id }, data: { status } as any });
  }

  listQuotes(status?: string) {
    const where: any = {};
    if (status) where.status = status;
    return this.prisma.quote.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  updateQuote(id: string, status: string, adminNotes?: string) {
    return this.prisma.quote.update({ where: { id }, data: { status, adminNotes, respondedAt: new Date() } as any });
  }

  listUsers(page = 1, limit = 50) {
    return this.prisma.user.findMany({
      select: { id: true, email: true, firstName: true, lastName: true, businessName: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  listCategories() {
    return this.prisma.category.findMany({ orderBy: { sortOrder: 'asc' } });
  }

  async upsertCategory(data: any) {
    if (data.id) return this.prisma.category.update({ where: { id: data.id }, data });
    return this.prisma.category.create({ data });
  }

  deleteCategory(id: string) {
    return this.prisma.category.update({ where: { id }, data: { active: false } });
  }
}
