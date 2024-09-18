import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { SectionTimeResponseDto } from './dto';
import { SectionTimesService } from './section-times.service';

@Controller('section-times')
@ApiTags('section-times')
export class SectionTimesController {
  constructor(private readonly sectionTimesService: SectionTimesService) {}

  @Get()
  @ApiOkResponse({
    type: [SectionTimeResponseDto],
  })
  async getSectionTimes(): Promise<SectionTimeResponseDto[]> {
    return this.sectionTimesService.getSectionTimes();
  }

  @Get(':id')
  @ApiOkResponse({
    type: SectionTimeResponseDto,
  })
  async getSectionTime(@Param('id') sectionTimeId: string): Promise<SectionTimeResponseDto> {
    return this.sectionTimesService.getSectionTime(sectionTimeId);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: SectionTimeResponseDto,
  })
  async deleteSectionTime(@Param('id') sectionTimeId: string): Promise<SectionTimeResponseDto> {
    return this.sectionTimesService.deleteSectionTime(sectionTimeId);
  }
}
