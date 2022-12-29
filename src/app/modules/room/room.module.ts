import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/app/models/users.model';
import { RoomSchema } from 'src/app/models/room.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }, { name: 'room', schema: RoomSchema }]),
  ],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
