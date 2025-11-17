import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from '../entities/notice.entity';
import { NoticeDto } from './dto/notice.dto';
import { format } from 'date-fns';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  async create(noticeData: NoticeDto) {
    if (!noticeData.content || !noticeData.title) {
      throw new Error('Content or title is required');
    }
    const notice = this.noticeRepository.create(noticeData);
    await this.noticeRepository.save(notice);
    return notice;
  }

  async findOne(noticeId: number) {
    const notice = await this.noticeRepository.findOne({
      where: { id: noticeId },
    });

    if (notice) {
      // 조회수 증가
      notice.viewCount = (notice.viewCount || 0) + 1;
      await this.noticeRepository.save(notice);

      return {
        ...notice,
        createdAt: format(new Date(notice.createdAt), 'yyyy.MM.dd'),
        updatedAt: format(new Date(notice.updatedAt), 'yyyy.MM.dd'),
      };
    }
    return notice;
  }

  async findAll() {
    const notices = await this.noticeRepository.find();
    return notices.map((notice) => ({
      ...notice,
      createdAt: format(new Date(notice.createdAt), 'yyyy.MM.dd'),
      updatedAt: format(new Date(notice.updatedAt), 'yyyy.MM.dd'),
    }));
  }

  async findRecent(limit: number = 3) {
    const notices = await this.noticeRepository.find({
      order: {
        createdAt: 'DESC', // 최신순 정렬
      },
      take: limit, // 개수 제한
    });
    return notices.map((notice) => ({
      ...notice,
      createdAt: format(new Date(notice.createdAt), 'yyyy.MM.dd'),
      updatedAt: format(new Date(notice.updatedAt), 'yyyy.MM.dd'),
    }));
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
