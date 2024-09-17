import { PartialType } from '@nestjs/swagger';

import { CreateSectionTimeDto } from './create-section-time.dto';

export class UpdateSectionTimeDto extends PartialType(CreateSectionTimeDto) {}
