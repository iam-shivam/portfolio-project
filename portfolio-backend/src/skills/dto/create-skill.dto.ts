import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  Max,
  IsIn,
} from 'class-validator';

export class CreateSkillDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsIn(['backend', 'database', 'frontend', 'other'])
  category?: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  level?: number;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}