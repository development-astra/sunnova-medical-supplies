import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe | null = null;
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private config: ConfigService) {
    const secretKey = config.get<string>('stripe.secretKey');
    if (secretKey) {
      this.stripe = new Stripe(secretKey, { apiVersion: '2024-12-18.acacia' });
    } else {
      this.logger.warn('Stripe not configured — payment processing disabled');
    }
  }

  async createPaymentIntent(amount: number, currency = 'usd', metadata: Record<string, string> = {}) {
    if (!this.stripe) {
      return { id: 'placeholder_pi_' + Date.now(), client_secret: null, status: 'requires_payment_method' };
    }
    const intent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      automatic_payment_methods: { enabled: true },
      metadata,
    });
    return { id: intent.id, client_secret: intent.client_secret, status: intent.status };
  }

  async handleWebhook(payload: Buffer, signature: string) {
    if (!this.stripe) return;
    const webhookSecret = this.config.get<string>('stripe.webhookSecret');
    if (!webhookSecret) return;
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch {
      throw new Error('Invalid webhook signature');
    }
    return event;
  }
}
