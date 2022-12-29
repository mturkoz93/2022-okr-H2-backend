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

  search(payload: any) {
    // await this.userModel.updateMany({"accept": true}, {"$set":{"level": 'sr'}}, {"multi": true, "upsert": true});

    return this.userModel.find({
      username: { $regex: '.*' + payload.search + '.*' },
      gender: { $in: +payload.gender === 0 ? [1, 2] : +payload.gender },
      level: payload?.levels?.length ? { $in: payload.levels } : { $regex: '.*' + '' + '.*' },
    }).sort({'updatedAt': -1}).select('-password -tokens -__v').populate('tags', '_id name');
  }

  findAll() {
    return this.userModel.find().sort({'updatedAt': -1}).select('-password -tokens -__v').populate('tags', '_id name');
  }

  async findOne(userId: string) {
    const user = await this.userModel.findOne({ $or:[ {'_id':userId }, {'username':userId} ]}).select('-password -createdAt -updatedAt -tokens -__v').populate('tags', '_id name').exec()

    if(!user) {
      throw new Error("Kullanıcı bulunamadı!");
      
    }

    return user;
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
