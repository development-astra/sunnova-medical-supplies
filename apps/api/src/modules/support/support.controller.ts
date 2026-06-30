import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SupportService } from './support.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Support')
@Controller('support')
export class SupportController {
  constructor(private support: SupportService) {}

  @Get('tickets')
  listTickets(@CurrentUser() user: any) {
    return this.support.listTickets(user.id);
  }

  @Get('tickets/:id')
  getTicket(@CurrentUser() user: any, @Param('id') id: string) {
    return this.support.getTicket(id, user.id);
  }

  @Post('tickets')
  createTicket(@CurrentUser() user: any, @Body() body: any) {
    return this.support.createTicket(user.id, body);
  }

  @Post('tickets/:id/messages')
  addMessage(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() body: { message: string },
  ) {
    return this.support.addMessage(id, user.id, body.message);
  }
}
