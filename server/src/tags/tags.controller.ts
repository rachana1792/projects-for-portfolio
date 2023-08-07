import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { AuthenticatedGuard } from '../auth/guards';
import { FilterDto, GetByIdDto, PaginationDto } from '../common/dto';
import { GetIdFromParams } from '../common/decorators';

@UseGuards(AuthenticatedGuard)
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query() filterDto: FilterDto,
  ) {
    return this.tagsService.findAll(paginationDto, filterDto);
  }

  @Get(':id')
  findOne(
    @GetIdFromParams('id')
    id: GetByIdDto,
  ) {
    return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @GetIdFromParams('id')
    id: GetByIdDto,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }
}
