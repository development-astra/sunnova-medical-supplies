import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SupportService {
  constructor(private prisma: PrismaService) {}

  listTickets(userId: string) {
    return this.prisma.supportTicket.findMany({
      where: { userId },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTicket(id: string, userId: string) {
    const ticket = await this.prisma.supportTicket.findFirst({
      where: { id, userId },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });
    if (!ticket) throw new NotFoundException('Ticket not found');
    return ticket;
  }

  async createTicket(
    userId: string,
    data: {
      subject: string;
      category: string;
      priority?: string;
      message: string;
      orderId?: string;
    },
  ) {
    const year = new Date().getFullYear();
    const rand = Math.floor(10000 + Math.random() * 90000);
    const ticketNumber = `TKT-${year}-${rand}`;
    return this.prisma.supportTicket.create({
      data: {
        userId,
        ticketNumber,
        subject: data.subject,
        category: data.category,
        priority: data.priority ?? 'MEDIUM',
        status: 'OPEN',
        orderId: data.orderId,
        messages: {
          create: { fromAdmin: false, message: data.message },
        },
      },
      include: { messages: true },
    });
  }

  async addMessage(ticketId: string, userId: string, message: string) {
    const ticket = await this.prisma.supportTicket.findFirst({
      where: { id: ticketId, userId },
    });
    if (!ticket) throw new NotFoundException('Ticket not found');
    return this.prisma.supportMessage.create({
      data: { ticketId, fromAdmin: false, message },
    });
  }
}
