import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TagDocument } from 'src/app/models/tags.model';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectModel('tag') private readonly tagModel: Model<TagDocument>,
  ) {}

  generateTags(createTagDto: CreateTagDto) {
    return this.tagModel.insertMany([
      {
        name: 'Spor',
      },
      {
        name: 'Müzik',
      },
      {
        name: 'Kitap',
      },
      {
        name: 'Seyahat',
      },
      {
        name: 'Resim',
      }
    ]);
  }

  create(payload) {
    return `This action create tag`;
  }

  findAll() {
    return `This action returns all tag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
