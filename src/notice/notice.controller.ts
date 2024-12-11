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
import { NoticeDto } from './dto/notice.dto';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  createNotice(@Body() noticeData: NoticeDto) {
    return this.noticeService.create(noticeData);
  }

  @Get()
  getNotices() {
    return this.noticeService.findAll();
  }

  @Get(':id')
  getNotice(@Param('id') id: number) {
    return this.noticeService.findOne(id);
  }

  @Put(':id')
  updateNotice(@Param('id') id: number, @Body() noticeData: NoticeDto) {
    return this.noticeService.update(id, noticeData);
  }

  @Delete(':id')
  deleteNotice(@Param('id') id: number) {
    return this.noticeService.remove(id);
  }
}
