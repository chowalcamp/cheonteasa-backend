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
    return await this.noticeRepository.find();
  }

  async update(noticeId: number, noticeData: NoticeDto) {
    console.log('Updating Notice:', noticeId, noticeData);
    if (!noticeData.content || !noticeData.title) {
      throw new Error('Content or title are required');
    }
    const existingNotice = await this.noticeRepository.findOne({
      where: { id: noticeId },
    });
    if (!existingNotice) {
      throw new Error('Notice not found');
    }
    const updatedNotice = { ...existingNotice, ...noticeData };
    await this.noticeRepository.save(updatedNotice);
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
