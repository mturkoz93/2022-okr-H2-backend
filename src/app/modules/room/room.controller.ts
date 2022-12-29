import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Room } from '../../models/room.model';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

@Controller('rooms')
export class RoomController {
  constructor(@InjectModel('room') private readonly model: Model<Room>) {} 

  @Get()
  find(@Query('q') q) { 
    if (q) return this.model.find({name: {$regex: new RegExp(`.*${q}.*`)}});
    else return this.model.find();
  }

  @Get('/:id')
  findById(@Param('id') id: string) { 
    return this.model.findById(id);
  }

  @Post()
  save(@Body() item: Room) { 
    return item._id
      ? this.model.findByIdAndUpdate(item._id, item, {new: true})
      : this.model.create(item);
  }
}