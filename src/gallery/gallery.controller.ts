import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryDto } from './dto/gallery.dto';
import { Gallery } from '../entities/gallery.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('gallery')
@Controller('gallery')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Roles('ADMIN', 'MEMBER')
  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: '갤러리 이미지 생성 (로그인 필요)',
    description: '새로운 갤러리 이미지를 등록합니다. 로그인한 사용자만 사용 가능합니다.',
  })
  @ApiBody({ type: GalleryDto })
  @ApiResponse({
    status: 201,
    description: '갤러리 이미지가 성공적으로 생성되었습니다.',
    type: Gallery,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청입니다.' })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자' })
  createGallery(@Body() galleryData: GalleryDto) {
    return this.galleryService.create(galleryData);
  }

  @Public()
  @Get('list')
  @ApiOperation({
    summary: '전체 갤러리 이미지 조회',
    description: '모든 갤러리 이미지 목록을 조회합니다. 최신순으로 정렬됩니다.',
  })
  @ApiResponse({
    status: 200,
    description: '갤러리 목록 조회 성공',
    type: [Gallery],
  })
  getList() {
    return this.galleryService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: '특정 갤러리 이미지 조회',
    description: 'ID로 특정 갤러리 이미지를 조회합니다.',
  })
  @ApiParam({ name: 'id', description: '갤러리 ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: '갤러리 조회 성공',
    type: Gallery,
  })
  @ApiResponse({ status: 404, description: '갤러리를 찾을 수 없습니다.' })
  getGallery(@Param('id') galleryId: number) {
    return this.galleryService.findOne(galleryId);
  }

  @Roles('ADMIN', 'MEMBER')
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({
    summary: '갤러리 이미지 수정 (로그인 필요)',
    description: '기존 갤러리 이미지를 수정합니다. 로그인한 사용자만 사용 가능합니다.',
  })
  @ApiParam({ name: 'id', description: '갤러리 ID', type: 'number' })
  @ApiBody({ type: GalleryDto })
  @ApiResponse({
    status: 200,
    description: '갤러리가 성공적으로 수정되었습니다.',
    type: Gallery,
  })
  @ApiResponse({ status: 404, description: '갤러리를 찾을 수 없습니다.' })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자' })
  updateGallery(
    @Param('id') galleryId: number,
    @Body() galleryData: GalleryDto,
  ) {
    return this.galleryService.update(galleryId, galleryData);
  }

  @Roles('ADMIN')
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: '갤러리 이미지 삭제 (관리자 전용)',
    description: '갤러리 이미지를 삭제합니다. 관리자만 사용 가능합니다.',
  })
  @ApiParam({ name: 'id', description: '갤러리 ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: '갤러리가 성공적으로 삭제되었습니다.',
  })
  @ApiResponse({ status: 404, description: '갤러리를 찾을 수 없습니다.' })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자' })
  @ApiResponse({ status: 403, description: '권한이 없습니다.' })
  deleteGallery(@Param('id') galleryId: number) {
    return this.galleryService.remove(galleryId);
  }
}
