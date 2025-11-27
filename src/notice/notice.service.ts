import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from '../entities/notice.entity';
import { Gallery } from '../entities/gallery.entity';
import { NoticeDto } from './dto/notice.dto';
import { format } from 'date-fns';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
  ) {}

  async create(noticeData: NoticeDto) {
    if (!noticeData.content || !noticeData.title || !noticeData.userId) {
      throw new Error('userId, title, and content are required');
    }

    const notice = this.noticeRepository.create({
      userId: noticeData.userId,
      title: noticeData.title,
      content: noticeData.content,
      category: noticeData.category,
    });

    const savedNotice = await this.noticeRepository.save(notice);

    // 갤러리 이미지 연결
    if (noticeData.galleryIds && noticeData.galleryIds.length > 0) {
      const galleries = await this.galleryRepository.findByIds(
        noticeData.galleryIds,
      );
      savedNotice.galleries = galleries;
      await this.noticeRepository.save(savedNotice);
    }

    return savedNotice;
  }

  async findOne(noticeId: number) {
    const notice = await this.noticeRepository.findOne({
      where: { id: noticeId },
      relations: ['user', 'galleries'],
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
    const notices = await this.noticeRepository.find({
      relations: ['user', 'galleries'],
    });
    return notices.map((notice) => ({
      ...notice,
      createdAt: format(new Date(notice.createdAt), 'yyyy.MM.dd'),
      updatedAt: format(new Date(notice.updatedAt), 'yyyy.MM.dd'),
    }));
  }

  async findRecent(limit: number = 3) {
    const notices = await this.noticeRepository.find({
      relations: ['user', 'galleries'],
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
      throw new Error('Content and title are required');
    }
    const existingNotice = await this.noticeRepository.findOne({
      where: { id: noticeId },
      relations: ['galleries'],
    });
    if (!existingNotice) {
      throw new Error('Notice not found');
    }

    // 기본 필드 업데이트
    existingNotice.title = noticeData.title;
    existingNotice.content = noticeData.content;
    if (noticeData.category) {
      existingNotice.category = noticeData.category;
    }

    // 갤러리 이미지 업데이트
    if (noticeData.galleryIds) {
      const galleries = await this.galleryRepository.findByIds(
        noticeData.galleryIds,
      );
      existingNotice.galleries = galleries;
    }

    await this.noticeRepository.save(existingNotice);
    return await this.noticeRepository.findOne({
      where: { id: noticeId },
      relations: ['user', 'galleries'],
    });
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
