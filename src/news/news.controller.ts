import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsDto } from './dto/news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  createNews(@Body() newsData: NewsDto) {
    return this.newsService.create(newsData);
  }

  @Get()
  getNews() {
    return this.newsService.findAll();
  }

  @Get(':id')
  getNewsById(@Param('id') id: number) {
    return this.newsService.findOne(id);
  }

  @Put(':id')
  updateNews(@Param('id') id: number, @Body() newsData: NewsDto) {
    return this.newsService.update(id, newsData);
  }

  @Delete(':id')
  deleteNews(@Param('id') id: number) {
    return this.newsService.remove(id);
  }
}
