import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from '../entities/gallery.entity';
import { GalleryDto } from './dto/gallery.dto';
import { format } from 'date-fns';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
  ) {}

  async create(galleryData: GalleryDto) {
    if (!galleryData.imageUrl || !galleryData.userId) {
      throw new Error('userId and imageUrl are required');
    }
    const gallery = this.galleryRepository.create(galleryData);
    await this.galleryRepository.save(gallery);
    return gallery;
  }

  async findOne(galleryId: number) {
    const gallery = await this.galleryRepository.findOne({
      where: { id: galleryId },
      relations: ['user'],
    });

    if (gallery) {
      return {
        ...gallery,
        createdAt: format(new Date(gallery.createdAt), 'yyyy.MM.dd'),
        updatedAt: format(new Date(gallery.updatedAt), 'yyyy.MM.dd'),
      };
    }
    return gallery;
  }

  async findAll() {
    const galleries = await this.galleryRepository.find({
      relations: ['user'],
      order: {
        createdAt: 'DESC', // 최신순 정렬
      },
    });
    return galleries.map((gallery) => ({
      ...gallery,
      createdAt: format(new Date(gallery.createdAt), 'yyyy.MM.dd'),
      updatedAt: format(new Date(gallery.updatedAt), 'yyyy.MM.dd'),
    }));
  }

  async update(galleryId: number, galleryData: GalleryDto) {
    const existingGallery = await this.galleryRepository.findOne({
      where: { id: galleryId },
    });
    if (!existingGallery) {
      throw new Error('Gallery not found');
    }
    const updatedGallery = { ...existingGallery, ...galleryData };
    await this.galleryRepository.save(updatedGallery);
    return await this.galleryRepository.findOne({ where: { id: galleryId } });
  }

  async remove(galleryId: number) {
    const gallery = await this.galleryRepository.findOne({
      where: { id: galleryId },
    });
    if (gallery) {
      await this.galleryRepository.remove(gallery);
      return gallery;
    }
    return null;
  }
}
