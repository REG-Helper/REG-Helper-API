import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { SectionResponseDto, UpdateSectionDto } from './dto';
import { SectionsService } from './sections.service';

@Controller('sections')
@ApiTags('sections')
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
    return this.sectionsService.getSectionByIdOrThrow(sectionId);
  }

  @Put(':id')
  @ApiOkResponse({
    type: SectionResponseDto,
  })
  async updateSection(
    @Param('id') sectionId: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ): Promise<SectionResponseDto> {
    return this.sectionsService.updateSection(sectionId, updateSectionDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: SectionResponseDto,
  })
  async deleteSection(@Param('id') sectionId: string): Promise<SectionResponseDto> {
    return this.sectionsService.deleteSection(sectionId);
  }
}
