import { Body, Controller, Get, Param, Post, Request, Query, UseGuards } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoomService } from './room.service';

@ApiTags('Room')
@ApiBearerAuth('JWT')
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getRooms(@Query('q') q) {
    return []
    // return this.roomService.getRooms()
  }

  @Get(':roomId')
  @UseGuards(AuthGuard('jwt'))
  async getRoomDetail(@Query('q') q, @Param('roomId') roomId: string) {
    return await this.roomService.getRoomDetail(roomId)
  }

  @Get('users/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getUserRooms(@Query('q') q, @Param('userId') userId: string) {
    return await this.roomService.getUserRooms(userId)
  }

  @Get(':roomId/users/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getUserRoom(@Query('q') q, @Param('userId') userId: string, @Param('userId') roomId: string) {
    return await this.roomService.getUserRoom(userId, roomId)
  }
}