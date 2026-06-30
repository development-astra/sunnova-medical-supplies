import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, firstName: true, lastName: true, businessName: true, role: true, createdAt: true },
    });
  }

  async updateProfile(id: string, data: { firstName?: string; lastName?: string; businessName?: string; phone?: string }) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async changePassword(id: string, currentPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user?.passwordHash) throw new NotFoundException();
    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) throw new NotFoundException('Current password is incorrect');
    const hash = await bcrypt.hash(newPassword, 12);
    await this.prisma.user.update({ where: { id }, data: { passwordHash: hash } });
    return { message: 'Password updated' };
  }

  getAddresses(userId: string) {
    return this.prisma.address.findMany({ where: { userId }, orderBy: { isDefault: 'desc' } });
  }

  async upsertAddress(userId: string, data: any) {
    if (data.isDefault) {
      await this.prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
    }
    if (data.id) {
      return this.prisma.address.update({ where: { id: data.id }, data });
    }
    return this.prisma.address.create({ data: { ...data, userId } });
  }

  deleteAddress(id: string, userId: string) {
    return this.prisma.address.deleteMany({ where: { id, userId } });
  }

  async getDashboardSummary(userId: string) {
    const [totalOrders, pendingOrders, completedOrders, wishlistCount, addressCount, rewardPoints, recentOrders] = await Promise.all([
      this.prisma.order.count({ where: { userId } }),
      this.prisma.order.count({ where: { userId, status: 'PENDING' } }),
      this.prisma.order.count({ where: { userId, status: 'DELIVERED' } }),
      this.prisma.wishlistItem.count({ where: { userId } }),
      this.prisma.address.count({ where: { userId } }),
      this.prisma.rewardTransaction.aggregate({ where: { userId }, _sum: { points: true } }),
      this.prisma.order.findMany({
        where: { userId },
        include: {
          items: {
            include: {
              product: { select: { name: true, imageUrl: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);
    return {
      totalOrders,
      pendingOrders,
      completedOrders,
      wishlistCount,
      addressCount,
      rewardPoints: rewardPoints._sum.points ?? 0,
      recentOrders,
    };
  }
}
