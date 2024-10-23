// src/modules/skills/skills.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateSkillDto, SkillResponseDto, UpdateSkillDto } from './dto';
import { SkillsService } from './skills.service';


@Controller('skills')
@ApiTags('skills')
// @UseGuards(AccessTokenGuard)
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @ApiCreatedResponse({
    type: SkillResponseDto,
  })
  async createSkill(@Body() createSkillDto: CreateSkillDto): Promise<SkillResponseDto> {
    const createdSkill = await this.skillsService.createSkill(createSkillDto);

    return SkillResponseDto.formatSkillResponse(createdSkill);
  }

  @Get()
  @ApiOkResponse({
    type: [SkillResponseDto],
  })
  async getSkills(): Promise<SkillResponseDto[]> {
    const skills = await this.skillsService.getSkills();

    return SkillResponseDto.formatSkillsResponse(skills);
  }

  @Get(':id')
  @ApiOkResponse({
    type: SkillResponseDto,
  })
  async getSkill(@Param('id') skillId: string): Promise<SkillResponseDto> {
    const skill = await this.skillsService.getSkillByIdOrThrow(skillId);

    return SkillResponseDto.formatSkillResponse(skill);
  }

  @Put(':id')
  @ApiOkResponse({
    type: SkillResponseDto,
  })
  async updateSkill(
    @Param('id') skillId: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ): Promise<SkillResponseDto> {
    const updatedSkill = await this.skillsService.updateSkill(skillId, updateSkillDto);

    return SkillResponseDto.formatSkillResponse(updatedSkill);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: SkillResponseDto,
  })
  async deleteSkill(@Param('id') skillId: string): Promise<SkillResponseDto> {
    const deletedSkill = await this.skillsService.deleteSkill(skillId);

    return SkillResponseDto.formatSkillResponse(deletedSkill);
  }
}