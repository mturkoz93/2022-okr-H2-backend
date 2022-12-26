import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from '../../models/users.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(username: string, password: string): Promise<any> {
    return this.userModel.create({
      username,
      password,
      // tags: ['']
    });
  }

  async getUser(query: object): Promise<any> {
    return this.userModel.findOne(query);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(userId: string): any {
    return this.userModel.findOne({ _id: userId }).select('-password');
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
