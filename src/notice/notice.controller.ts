import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeDto } from './dto/notice.dto';
import { Notice } from '../entities/notice.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('notice')
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Roles('ADMIN', 'MEMBER')
  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: '공지사항 생성 (로그인 필요)',
    description:
      '새로운 공지사항을 생성합니다. 로그인한 사용자만 사용 가능합니다.',
  })
  @ApiBody({ type: NoticeDto })
  @ApiResponse({
    status: 201,
    description: '공지사항이 성공적으로 생성되었습니다.',
    type: Notice,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청입니다.' })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자' })
  createNotice(@Body() noticeData: NoticeDto) {
    return this.noticeService.create(noticeData);
  }

  @Get()
  @ApiOperation({
    summary: '전체 공지사항 조회',
    description: '모든 공지사항 목록을 조회합니다. (인증 불필요)',
  })
  @ApiResponse({
    status: 200,
    description: '공지사항 목록 조회 성공',
    type: [Notice],
  })
  getNotices() {
    return this.noticeService.findAll();
  }

  @Get('recent')
  @ApiOperation({
    summary: '최근 공지사항 3개 조회',
    description:
      '최신 공지사항 3개를 조회합니다. 생성일 기준 내림차순 정렬됩니다. (인증 불필요)',
  })
  @ApiResponse({
    status: 200,
    description: '최근 공지사항 조회 성공',
    type: [Notice],
  })
  getRecentNotices() {
    return this.noticeService.findRecent(3);
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 공지사항 조회',
    description:
      'ID로 특정 공지사항을 조회합니다. 조회 시 자동으로 조회수가 증가합니다. (인증 불필요)',
  })
  @ApiParam({ name: 'id', description: '공지사항 ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: '공지사항 조회 성공',
    type: Notice,
  })
  @ApiResponse({ status: 404, description: '공지사항을 찾을 수 없습니다.' })
  getNotice(@Param('id') noticeId: string) {
    return this.noticeService.findOne(noticeId);
  }

  @Roles('ADMIN', 'MEMBER')
  @ApiBearerAuth()
  @Post('/update/:id')
  @ApiOperation({
    summary: '공지사항 수정 (로그인 필요)',
    description:
      '기존 공지사항을 수정합니다. 로그인한 사용자만 사용 가능합니다.',
  })
  @ApiParam({ name: 'id', description: '공지사항 ID', type: 'string' })
  @ApiBody({ type: NoticeDto })
  @ApiResponse({
    status: 200,
    description: '공지사항이 성공적으로 수정되었습니다.',
    type: Notice,
  })
  @ApiResponse({ status: 404, description: '공지사항을 찾을 수 없습니다.' })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자' })
  updateNotice(@Param('id') noticeId: string, @Body() noticeData: NoticeDto) {
    console.log('Received update request for notice:', noticeId);
    return this.noticeService.update(noticeId, noticeData);
  }

  @Roles('ADMIN')
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: '공지사항 삭제 (관리자 전용)',
    description: '공지사항을 삭제합니다. 관리자만 사용 가능합니다.',
  })
  @ApiParam({ name: 'id', description: '공지사항 ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: '공지사항이 성공적으로 삭제되었습니다.',
  })
  @ApiResponse({ status: 404, description: '공지사항을 찾을 수 없습니다.' })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자' })
  @ApiResponse({ status: 403, description: '권한이 없습니다.' })
  deleteNotice(@Param('id') noticeId: string) {
    return this.noticeService.remove(noticeId);
  }
}
