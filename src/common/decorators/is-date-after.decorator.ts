import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDateAfter', async: false })
export class IsDateAfterConstraint implements ValidatorConstraintInterface {
  validate(endAt: string, args?: ValidationArguments): Promise<boolean> | boolean {
    const startAt = args?.object?.['startAt'];

    return startAt && endAt && new Date(startAt) < new Date(endAt);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be later than startAt`;
  }
}

export function IsDateAfter(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isDateAfter',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateAfterConstraint,
    });
  };
}
