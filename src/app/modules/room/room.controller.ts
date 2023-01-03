import { Body, Controller, Get, Param, Post, Request, Query, UseGuards } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { AuthGuard } from '@nestjs/passport';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getRooms(@Query('q') q) {
    return []
    // return this.roomService.getRooms()
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getUserRooms(@Query('q') q, @Param('userId') userId: string) {
    return await this.roomService.getUserRooms(userId)
  }
}