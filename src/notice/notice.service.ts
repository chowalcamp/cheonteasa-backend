import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from '../entities/notice.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  async create(noticeData: Notice) {
    const newNotice = this.noticeRepository.create(noticeData);
    return await this.noticeRepository.save(newNotice);
  }

  async findOne(id: string) {
    return await this.noticeRepository.findOne({ where: { id } });
  }

  async findAll() {
    return await this.noticeRepository.find();
  }

  async update(id: string, noticeData: Notice) {
    await this.noticeRepository.update(id, noticeData);
    return await this.noticeRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const notice = await this.noticeRepository.findOne({ where: { id } });
    if (notice) {
      await this.noticeRepository.remove(notice);
      return notice;
    }
    return null;
  }
}
