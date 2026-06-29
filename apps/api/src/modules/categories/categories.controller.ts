import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categories: CategoriesService) {}

  @Get() @Public() findAll() { return this.categories.findAll(); }
  @Get(':slug') @Public() findOne(@Param('slug') slug: string) { return this.categories.findBySlug(slug); }
}
