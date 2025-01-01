import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from '../entities/notice.entity';
import { NoticeDto } from './dto/notice.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  async create(noticeData: NoticeDto) {
    if (!noticeData.content) {
      throw new Error('Content is required');
    }
    const notice = this.noticeRepository.create(noticeData);
    await this.noticeRepository.save(notice);
    return notice;
  }

  async findOne(noticeId: number) {
    return await this.noticeRepository.findOne({ where: { id: noticeId } });
  }

  async findAll() {
    const notices = await this.noticeRepository.find();
    console.log(notices); // 결과 확인
    return notices;
  }

  async update(noticeId: number, noticeData: NoticeDto) {
    if (!noticeData.content || !noticeData.title) {
      throw new Error('Content or title are required');
    }
    await this.noticeRepository.update(noticeId, noticeData);
    return await this.noticeRepository.findOne({ where: { id: noticeId } });
  }

  async remove(noticeId: number) {
    const notice = await this.noticeRepository.findOne({
      where: { id: noticeId },
    });
    if (notice) {
      await this.noticeRepository.remove(notice);
      return notice;
    }
    return null;
  }
}
