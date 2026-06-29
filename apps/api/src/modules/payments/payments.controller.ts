import { Controller, Post, Body, Req, Headers, RawBodyRequest } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PaymentsService } from './payments.service';
import { Request } from 'express';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private payments: PaymentsService) {}

  @Post('create-intent')
  createIntent(@CurrentUser() user: any, @Body() body: { amount: number; cartId: string }) {
    return this.payments.createPaymentIntent(body.amount, 'usd', { userId: user.id, cartId: body.cartId });
  }

  @Post('webhook')
  @Public()
  async webhook(@Req() req: RawBodyRequest<Request>, @Headers('stripe-signature') sig: string) {
    const event = await this.payments.handleWebhook(req.rawBody ?? Buffer.alloc(0), sig);
    return { received: true, type: event?.type };
  }
}
