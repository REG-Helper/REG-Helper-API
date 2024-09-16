import { IsISO8601, IsNotEmpty } from 'class-validator';

export class CreateSectionTimeDto {
  @IsISO8601()
  @IsNotEmpty()
  startAt: string;

  @IsISO8601()
  @IsNotEmpty()
  endAt: string;
}
