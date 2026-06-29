import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;
  private from: string;

  constructor(private config: ConfigService) {
    this.from = config.get<string>('email.from', 'orders@sunnovamedical.com');
    const resendKey = config.get<string>('email.resendKey');

    if (resendKey) {
      this.transporter = nodemailer.createTransport({
        host: 'smtp.resend.com',
        port: 465,
        secure: true,
        auth: { user: 'resend', pass: resendKey },
      });
    } else {
      this.logger.warn('No email provider configured — emails will be logged only');
      this.transporter = nodemailer.createTransport({ jsonTransport: true } as any);
    }
  }

  async send(to: string, subject: string, html: string) {
    try {
      await this.transporter.sendMail({ from: this.from, to, subject, html });
    } catch (err) {
      this.logger.error(`Email send failed to ${to}: ${err.message}`);
    }
  }

  async sendOrderConfirmation(order: any) {
    await this.send(
      order.user?.email ?? order.email,
      `Order Confirmed — ${order.orderNumber}`,
      `<h1>Order Confirmed</h1><p>Your order <strong>${order.orderNumber}</strong> has been confirmed. We'll deliver to you soon!</p>`,
    );
  }

  async sendQuoteReceived(quote: any) {
    await this.send(
      quote.email,
      `Quote Request Received — ${quote.refNumber}`,
      `<h1>We got your quote request!</h1><p>Reference: <strong>${quote.refNumber}</strong>. Isabella will follow up within 1 hour.</p>`,
    );
  }

  async sendPasswordReset(email: string, token: string, siteUrl: string) {
    const link = `${siteUrl}/reset-password?token=${token}`;
    await this.send(
      email,
      'Reset Your Password — Sunnova Medical',
      `<p>Click <a href="${link}">here</a> to reset your password. Link expires in 1 hour.</p>`,
    );
  }
}
