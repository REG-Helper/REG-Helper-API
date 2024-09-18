import { CourseSubGroup } from '@prisma/client';
import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

import { groupWithSubgroup } from '@/shared/constants/course';

export function IsValidSubGroupForGroup(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(subGroup: CourseSubGroup, args: ValidationArguments) {
          const group = args?.object?.['group'];

          if (!group) {
            return false;
          }

          const allowedSubGroups = groupWithSubgroup.get(group);

          return allowedSubGroups ? allowedSubGroups.includes(subGroup) : false;
        },
        defaultMessage(args: ValidationArguments) {
          const group = args?.object?.['group'];

          return group
            ? `Subgroup ${args.value} is not valid for the group ${group}.`
            : `Invalid group provided for the subgroup ${args.value}.`;
        },
      },
    });
  };
}
