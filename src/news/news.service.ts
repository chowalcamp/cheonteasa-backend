import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../entities/news.entity';
import { NewsDto } from './dto/news.dto';
import { format } from 'date-fns';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async create(newsData: NewsDto) {
    if (!newsData.content || !newsData.title) {
      throw new Error('Content or title is required');
    }
    const newNews = this.newsRepository.create(newsData);
    await this.newsRepository.save(newNews);
    return newNews;
  }

  async findOne(newsId: number) {
    const news = await this.newsRepository.findOne({
      where: { id: newsId },
    });
    if (news) {
      return {
        ...news,
        createdAt: format(new Date(news.createdAt), 'yyyy MM dd'),
        updatedAt: format(new Date(news.updatedAt), 'yyyy MM dd'),
      };
    }
    return news;
  }

  async findAll() {
    const news = await this.newsRepository.find();
    return news.map((news) => ({
      ...news,
      createdAt: format(new Date(news.createdAt), 'yyyy MM dd'),
      updatedAt: format(new Date(news.updatedAt), 'yyyy MM dd'),
    }));
  }

  async update(newsId: number, newsData: NewsDto) {
    if (!newsData.content || !newsData.title) {
      throw new Error('Content or title is required');
    }
    const existingNews = await this.newsRepository.findOne({
      where: { id: newsId },
    });
    if (!existingNews) {
      throw new Error('News not found');
    }
    const updatedNews = { ...existingNews, ...newsData };
    await this.newsRepository.save(updatedNews);
    return await this.newsRepository.findOne({ where: { id: newsId } });
  }

  async remove(newsId: number) {
    const news = await this.newsRepository.findOne({
      where: { id: newsId },
    });
    if (news) {
      await this.newsRepository.remove(news);
      return news;
    }
    return null;
  }
}
