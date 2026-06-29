import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { QuotesService, CreateQuoteDto } from './quotes.service';

@ApiTags('Quotes')
@Controller('quotes')
export class QuotesController {
  constructor(private quotes: QuotesService) {}

  @Post() @Public() create(@Body() dto: CreateQuoteDto, @CurrentUser() user?: any) {
    return this.quotes.create({ ...dto, userId: user?.id });
  }

  @Get('mine') findMine(@CurrentUser() user: any) {
    return this.quotes.findAllForUser(user.id);
  }
}
