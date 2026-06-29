import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateQuoteDto {
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  facilityType?: string;
  location?: string;
  productsNeeded: string;
  timeline?: string;
  preferredContact?: string;
  notes?: string;
  userId?: string;
}

@Injectable()
export class QuotesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateQuoteDto) {
    const refNumber = `QT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;
    return this.prisma.quote.create({
      data: { ...dto, refNumber, status: 'PENDING' },
    });
  }

  findAllForUser(userId: string) {
    return this.prisma.quote.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findAll() {
    return this.prisma.quote.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async updateStatus(id: string, status: string, adminNotes?: string) {
    return this.prisma.quote.update({ where: { id }, data: { status, adminNotes } });
  }
}
