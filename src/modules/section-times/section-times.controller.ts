import { Controller } from '@nestjs/common';

import { SectionTimesService } from './section-times.service';

@Controller('section-times')
export class SectionTimesController {
  constructor(private readonly sectionTimesService: SectionTimesService) {}
}
