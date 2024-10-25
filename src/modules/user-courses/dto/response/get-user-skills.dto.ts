import { ApiProperty } from '@nestjs/swagger';

export class UserSkillResponseDto {
  @ApiProperty({
    example: 'Programming',
    description: 'The name of the skill in English',
  })
  nameEn: string;

  @ApiProperty({
    example: 'การเขียนโปรแกรม',
    description: 'The name of the skill in Thai',
  })
  nameTh: string;

  @ApiProperty({
    example: 10,
    description: 'The total weight of the skill across all courses',
  })
  weight: number;

  constructor(partial: Partial<UserSkillResponseDto>) {
    Object.assign(this, partial);
  }
}
