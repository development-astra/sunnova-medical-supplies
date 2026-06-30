import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RewardsService {
  constructor(private prisma: PrismaService) {}

  async getSummary(userId: string) {
    const [netAggregate, earnedAggregate] = await Promise.all([
      this.prisma.rewardTransaction.aggregate({
        where: { userId },
        _sum: { points: true },
      }),
      this.prisma.rewardTransaction.aggregate({
        where: { userId, points: { gt: 0 } },
        _sum: { points: true },
      }),
    ]);

    const totalPoints = netAggregate._sum.points ?? 0;
    const lifetimePoints = earnedAggregate._sum.points ?? 0;

    let tier = 'Bronze';
    let nextTierPoints = 500 - totalPoints;
    if (totalPoints >= 5000) {
      tier = 'Platinum';
      nextTierPoints = 0;
    } else if (totalPoints >= 2000) {
      tier = 'Gold';
      nextTierPoints = 5000 - totalPoints;
    } else if (totalPoints >= 500) {
      tier = 'Silver';
      nextTierPoints = 2000 - totalPoints;
    }

    return { totalPoints, lifetimePoints, tier, nextTierPoints };
  }

  getHistory(userId: string) {
    return this.prisma.rewardTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
