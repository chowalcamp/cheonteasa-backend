import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import { Notice } from 'src/entities/notice.entity';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  createNotice(@Body() noticeData: Notice) {
    return this.noticeService.create(noticeData);
  }

  @Get()
  getNotices() {
    return this.noticeService.findAll();
  }

  @Get(':id')
  getNotice(@Param('id') id: string) {
    return this.noticeService.findOne(id);
  }

  @Put(':id')
  updateNotice(@Param('id') id: string, @Body() noticeData: Notice) {
    return this.noticeService.update(id, noticeData);
  }

  @Delete(':id')
  deleteNotice(@Param('id') id: string) {
    return this.noticeService.remove(id);
  }
}
