import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateSkillCourseMappingDto, SkillCourseMappingResponseDto } from './dto';
import { SkillCourseMappingService } from './skill-course-mapping.service';


@Controller('skill-course-mapping')
@ApiTags('skill-course-mapping')
// @ApiBearerAuth()
// @UseGuards(AccessTokenGuard)
export class SkillCourseMappingController {
  constructor(private readonly SkillCourseMappingService: SkillCourseMappingService) {}

  @Post()
  @ApiCreatedResponse({ type: SkillCourseMappingResponseDto })
  async createMapping(@Body() createDto: CreateSkillCourseMappingDto): Promise<SkillCourseMappingResponseDto> {
    const mapping = await this.SkillCourseMappingService.createMapping(createDto);

    return SkillCourseMappingResponseDto.fromEntity(mapping);
  }

  @Get()
  @ApiOkResponse({ type: [SkillCourseMappingResponseDto] })
  async getAllMappings(): Promise<SkillCourseMappingResponseDto[]> {
    const mappings = await this.SkillCourseMappingService.getAllMappings();

    return mappings.map(SkillCourseMappingResponseDto.fromEntity);
  }
}

