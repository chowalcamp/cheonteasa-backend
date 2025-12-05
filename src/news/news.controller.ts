import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsDto } from './dto/news.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Roles('ADMIN')
  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: '뉴스 생성 (관리자 전용)',
    description: '새로운 뉴스를 생성합니다. 관리자만 사용 가능합니다.',
  })
  @ApiBody({ type: NewsDto })
  @ApiResponse({
    status: 201,
    description: '뉴스가 성공적으로 생성되었습니다.',
  })
  @ApiResponse({ status: 400, description: '잘못된 요청입니다.' })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자' })
  @ApiResponse({ status: 403, description: '권한이 없습니다.' })
  createNews(@Body() newsData: NewsDto) {
    return this.newsService.create(newsData);
  }

  @Get()
  @ApiOperation({
    summary: '전체 뉴스 조회',
    description: '모든 뉴스 목록을 조회합니다. (인증 불필요)',
  })
  @ApiResponse({ status: 200, description: '뉴스 목록 조회 성공' })
  getNews() {
    return this.newsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 뉴스 조회',
    description: 'ID로 특정 뉴스를 조회합니다. (인증 불필요)',
  })
  @ApiParam({ name: 'id', description: '뉴스 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '뉴스 조회 성공' })
  @ApiResponse({ status: 404, description: '뉴스를 찾을 수 없습니다.' })
  getNewsById(@Param('id') id: number) {
    return this.newsService.findOne(id);
  }

  @Roles('ADMIN')
  @ApiBearerAuth()
  @Post(':id')
  @ApiOperation({
    summary: '뉴스 수정 (관리자 전용)',
    description: '기존 뉴스를 수정합니다. 관리자만 사용 가능합니다.',
  })
  @ApiParam({ name: 'id', description: '뉴스 ID', type: 'number' })
  @ApiBody({ type: NewsDto })
  @ApiResponse({
    status: 200,
    description: '뉴스가 성공적으로 수정되었습니다.',
  })
  @ApiResponse({ status: 404, description: '뉴스를 찾을 수 없습니다.' })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자' })
  @ApiResponse({ status: 403, description: '권한이 없습니다.' })
  updateNews(@Param('id') id: number, @Body() newsData: NewsDto) {
    return this.newsService.update(id, newsData);
  }

  @Roles('ADMIN')
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: '뉴스 삭제 (관리자 전용)',
    description: '뉴스를 삭제합니다. 관리자만 사용 가능합니다.',
  })
  @ApiParam({ name: 'id', description: '뉴스 ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: '뉴스가 성공적으로 삭제되었습니다.',
  })
  @ApiResponse({ status: 404, description: '뉴스를 찾을 수 없습니다.' })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자' })
  @ApiResponse({ status: 403, description: '권한이 없습니다.' })
  deleteNews(@Param('id') id: number) {
    return this.newsService.remove(id);
  }
}
