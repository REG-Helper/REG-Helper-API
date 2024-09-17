import { Controller } from '@nestjs/common';

import { UserCoursesService } from './user-courses.service';

@Controller('user-courses')
export class UserCoursesController {
  constructor(private readonly userCoursesService: UserCoursesService) {}
}
