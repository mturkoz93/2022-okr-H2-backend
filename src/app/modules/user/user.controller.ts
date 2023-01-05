import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { LoggingInterceptor } from 'src/app/interceptors/logging.interceptor';


// @UseInterceptors(LoggingInterceptor)
@ApiTags('User')
@ApiBearerAuth('JWT')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* @Post()
  createUser(@Body() payload: CreateUserDto) {
    return this.userService.createUser(payload);
  } */

  @Post('search')
  search(@Body() payload: any) {
    return this.userService.search(payload);
  }
  
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get(':user_id/tokens')
  getUserTokens(@Param('user_id') user_id: string) {
    return this.userService.getUserTokens(user_id);
  }
}
