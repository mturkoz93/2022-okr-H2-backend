import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from '../../models/users.model';
import { TagDocument } from 'src/app/models/tags.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    @InjectModel('tag') private readonly tagModel: Model<TagDocument>,
  ) {}

  async createUser(payload: any): Promise<any> {
    const tags = await this.tagModel.find().limit(3)

    return this.userModel.create({
      username: payload.username,
      password: payload.password,
      tags: tags?.map((tag) => tag._id),
      about: payload.about || '',
      accept: payload.accept,
      avatar: payload.avatar || '',
      gender: payload.gender,
      level: payload.level || '',
    });
  }

  // for auth validateUser function
  async getUser(query: object): Promise<any> {
    return this.userModel.findOne(query);
  }

  findAll() {
    return this.userModel.find().sort({'updatedAt': -1}).select('-password -tokens -__v').populate('tags', '_id name');
  }

  findOne(userId: string): any {
    return this.userModel.findOne({ _id: userId }).select('-password -createdAt -updatedAt -tokens -__v').populate('tags', '_id name');
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getUserTokens(userId: string): any {
    return this.userModel.find({ _id: userId }).populate('tokens').exec();
  }
}
