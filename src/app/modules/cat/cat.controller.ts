import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Redirect,
} from '@nestjs/common';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './dto';

@Controller('cats')
export class CatController {
  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }

  @Post('create2')
  @HttpCode(204)
  create2(): string {
    return 'This action adds a new cat';
  }

  @Get('findAllAsync')
  async findAllAsync(): Promise<any[]> {
    return [];
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Get(':id/2')
  findOne2(@Param('id') id: string): string {
    return `This action returns a #${id} cat2`;
  }

  @Get()
  @Redirect('http://mustafaturkoz.blogspot.com', 301)
  about(): string {
    return 'About';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
