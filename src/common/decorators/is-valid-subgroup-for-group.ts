import { CourseSubGroup } from '@prisma/client';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

import { groupWithSubgroup } from '@/shared/constants/course';

@ValidatorConstraint({ name: 'isValidSubGroupForGroup', async: false })
export class IsValidSubGroupForGroupConstraint implements ValidatorConstraintInterface {
  validate(subGroup: CourseSubGroup, args: ValidationArguments) {
    const group = args?.object?.['group'];

    if (!group) {
      return false;
    }

    const allowedSubGroups = groupWithSubgroup.get(group);

    return allowedSubGroups ? allowedSubGroups.includes(subGroup) : false;
  }

  defaultMessage(args: ValidationArguments) {
    const group = args?.object?.['group'];

    return group
      ? `Subgroup ${args.value} is not valid for the group ${group}.`
      : `Invalid group provided for the subgroup ${args.value}.`;
  }
}

export function IsValidSubGroupForGroup(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isValidSubGroupForGroup',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidSubGroupForGroupConstraint,
    });
  };
}
