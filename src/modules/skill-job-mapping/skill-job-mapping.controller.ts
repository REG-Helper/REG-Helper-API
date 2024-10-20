
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateSkillJobMappingDto, SkillJobMappingResponseDto } from './dto';
import { SkillJobMappingService } from './skill-job-mapping.service';


@Controller('skill-job-mapping')
@ApiTags('skill-job-mapping')
// @ApiBearerAuth()
// @UseGuards(AccessTokenGuard)
export class SkillJobMappingController {
  constructor(private readonly skillJobMappingService: SkillJobMappingService) {}

  @Post()
  @ApiCreatedResponse({ type: SkillJobMappingResponseDto })
  async createMapping(@Body() createDto: CreateSkillJobMappingDto): Promise<SkillJobMappingResponseDto> {
    const mapping = await this.skillJobMappingService.createMapping(createDto);

    return SkillJobMappingResponseDto.fromEntity(mapping);
  }

  @Get()
  @ApiOkResponse({ type: [SkillJobMappingResponseDto] })
  async getAllMappings(): Promise<SkillJobMappingResponseDto[]> {
    const mappings = await this.skillJobMappingService.getAllMappings();

    return mappings.map(SkillJobMappingResponseDto.fromEntity);
  }
}