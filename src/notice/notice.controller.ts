import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeDto } from './dto/notice.dto';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  // TODO: 업로드된 이미지 아이디도 추가
  @Post()
  createNotice(@Body() noticeData: NoticeDto) {
    return this.noticeService.create(noticeData);
  }

  @Get()
  getNotices() {
    return this.noticeService.findAll();
  }

  @Get(':id')
  getNotice(@Param('id') noticeId: number) {
    return this.noticeService.findOne(noticeId);
  }

  @Post('/update/:id')
  updateNotice(@Param('id') noticeId: number, @Body() noticeData: NoticeDto) {
    console.log('Received update request for notice:', noticeId);
    return this.noticeService.update(noticeId, noticeData);
  }

  @Delete(':id')
  deleteNotice(@Param('id') noticeId: number) {
    return this.noticeService.remove(noticeId);
  }
}
