import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { SectionResponseDto, UpdateSectionDto } from './dto';
import { SectionsService } from './sections.service';

import { SectionWithTeachers } from '@/shared/interfaces';

@Controller('sections')
@ApiTags('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get()
  @ApiOkResponse({
    type: [SectionResponseDto],
  })
  async getSections(): Promise<SectionResponseDto[]> {
    const sections = await this.sectionsService.getSections();

    return SectionResponseDto.formatSectionsResponse(sections);
  }

  @Get(':id')
  @ApiOkResponse({
    type: SectionResponseDto,
  })
  async getSection(@Param('id') sectionId: string): Promise<SectionResponseDto> {
    const section = await this.sectionsService.getSectionByIdOrThrow(sectionId);

    return SectionResponseDto.formatSectionResponse(section as SectionWithTeachers);
  }

  @Put(':id')
  @ApiOkResponse({
    type: SectionResponseDto,
  })
  async updateSection(
    @Param('id') sectionId: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ): Promise<SectionResponseDto> {
    const updatedSection = await this.sectionsService.updateSection(sectionId, updateSectionDto);

    return SectionResponseDto.formatSectionResponse(updatedSection);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: SectionResponseDto,
  })
  async deleteSection(@Param('id') sectionId: string): Promise<SectionResponseDto> {
    const deletedSection = await this.sectionsService.deleteSection(sectionId);

    return SectionResponseDto.formatSectionResponse(deletedSection);
  }
}
