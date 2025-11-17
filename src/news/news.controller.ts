import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsDto } from './dto/news.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({
    summary: '뉴스 생성',
    description: '새로운 뉴스를 생성합니다.',
  })
  @ApiBody({ type: NewsDto })
  @ApiResponse({
    status: 201,
    description: '뉴스가 성공적으로 생성되었습니다.',
  })
  @ApiResponse({ status: 400, description: '잘못된 요청입니다.' })
  createNews(@Body() newsData: NewsDto) {
    return this.newsService.create(newsData);
  }

  @Get()
  @ApiOperation({
    summary: '전체 뉴스 조회',
    description: '모든 뉴스 목록을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '뉴스 목록 조회 성공' })
  getNews() {
    return this.newsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 뉴스 조회',
    description: 'ID로 특정 뉴스를 조회합니다.',
  })
  @ApiParam({ name: 'id', description: '뉴스 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '뉴스 조회 성공' })
  @ApiResponse({ status: 404, description: '뉴스를 찾을 수 없습니다.' })
  getNewsById(@Param('id') id: number) {
    return this.newsService.findOne(id);
  }

  @Post(':id')
  @ApiOperation({
    summary: '뉴스 수정',
    description: '기존 뉴스를 수정합니다.',
  })
  @ApiParam({ name: 'id', description: '뉴스 ID', type: 'number' })
  @ApiBody({ type: NewsDto })
  @ApiResponse({
    status: 200,
    description: '뉴스가 성공적으로 수정되었습니다.',
  })
  @ApiResponse({ status: 404, description: '뉴스를 찾을 수 없습니다.' })
  updateNews(@Param('id') id: number, @Body() newsData: NewsDto) {
    return this.newsService.update(id, newsData);
  }

  @Delete(':id')
  @ApiOperation({ summary: '뉴스 삭제', description: '뉴스를 삭제합니다.' })
  @ApiParam({ name: 'id', description: '뉴스 ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: '뉴스가 성공적으로 삭제되었습니다.',
  })
  @ApiResponse({ status: 404, description: '뉴스를 찾을 수 없습니다.' })
  deleteNews(@Param('id') id: number) {
    return this.newsService.remove(id);
  }
}
