import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './users.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(username: string, password: string): Promise<any> {
    return this.userModel.create({
      username,
      password,
    });
  }

  async getUser(query: object): Promise<any> {
    return this.userModel.findOne(query);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(username: string): any {
    return this.userModel.find({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
