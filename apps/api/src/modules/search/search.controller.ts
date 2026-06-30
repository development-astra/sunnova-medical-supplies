import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { SearchService } from './search.service';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  @Public()
  @ApiQuery({ name: 'q', required: true })
  search(@Query('q') q: string, @Query('limit') limit?: number) {
    return this.searchService.search(q, limit);
  }
}
