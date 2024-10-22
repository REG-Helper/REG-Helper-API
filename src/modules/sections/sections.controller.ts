import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserRole } from '@prisma/client';

import { GetYearsAndSemestersResponseDto, SectionResponseDto, UpdateSectionDto } from './dto';
import { SectionsService } from './sections.service';

import { Roles } from '@/common/decorators';
import { AccessTokenGuard, RolesGuard } from '@/common/guards';
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

  @Get('years-semesters')
  @ApiOkResponse({
    type: [GetYearsAndSemestersResponseDto],
  })
  async getYearsAndSemesters() {
    return this.sectionsService.getYearsAndSemesters();
  }

  @Get(':id')
  @ApiOkResponse({
    type: SectionResponseDto,
  })
  async getSection(
    @Param('id', new ParseUUIDPipe()) sectionId: string,
  ): Promise<SectionResponseDto> {
    const section = await this.sectionsService.getSectionByIdOrThrow(sectionId);

    return SectionResponseDto.formatSectionResponse(section as SectionWithTeachers);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOkResponse({
    type: SectionResponseDto,
  })
  async updateSection(
    @Param('id', new ParseUUIDPipe()) sectionId: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ): Promise<SectionResponseDto> {
    const updatedSection = await this.sectionsService.updateSection(sectionId, updateSectionDto);

    return SectionResponseDto.formatSectionResponse(updatedSection);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOkResponse({
    type: SectionResponseDto,
  })
  async deleteSection(
    @Param('id', new ParseUUIDPipe()) sectionId: string,
  ): Promise<SectionResponseDto> {
    const deletedSection = await this.sectionsService.deleteSection(sectionId);

    return SectionResponseDto.formatSectionResponse(deletedSection);
  }
}
