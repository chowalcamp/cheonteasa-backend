import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../entities/news.entity';
import { NewsDto } from './dto/news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async create(newsData: NewsDto) {
    const newNews = this.newsRepository.create(newsData);
    return await this.newsRepository.save(newNews);
  }

  async findOne(newsId: number) {
    return await this.newsRepository.findOne({ where: { id: newsId } });
  }

  async findAll() {
    return await this.newsRepository.find();
  }

  async update(newsId: number, newsData: NewsDto) {
    await this.newsRepository.update(newsId, newsData);
    return await this.newsRepository.findOne({ where: { id: newsId } });
  }

  async remove(newsId: number) {
    const news = await this.newsRepository.findOne({
      where: { id: newsId },
    });
    await this.newsRepository.remove(news);
  }
}
