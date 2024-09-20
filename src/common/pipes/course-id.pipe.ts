import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { COURSE_ID_REGEX } from '@/shared/constants';

@Injectable()
export class ParseCourseIdPipe implements PipeTransform {
  transform(value: string) {
    if (!value || !COURSE_ID_REGEX.test(value)) {
      throw new BadRequestException('Invalid Course Id');
    }

    return value;
  }
}
