import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { SectionResponseDto } from './dto';
import { SectionsService } from './sections.service';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get()
  @ApiOkResponse({
    type: [SectionResponseDto],
  })
  async getSections(): Promise<SectionResponseDto[]> {
    return this.sectionsService.getSections();
  }

  @Get(':id')
  @ApiOkResponse({
    type: SectionResponseDto,
  })
  async getSection(@Param('id') sectionId: string): Promise<SectionResponseDto> {
    return this.sectionsService.getSection(sectionId);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: SectionResponseDto,
  })
  async deleteSection(@Param('id') sectionId: string): Promise<SectionResponseDto> {
    return this.sectionsService.deleteSection(sectionId);
  }
}
