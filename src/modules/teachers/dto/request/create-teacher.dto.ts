import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsOptional()
  firstnameEn: string;

  @IsString()
  @IsOptional()
  lastnameEn: string;

  @IsString()
  @IsNotEmpty()
  firstnameTh: string;

  @IsString()
  @IsNotEmpty()
  lastnameTh: string;
}
