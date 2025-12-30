import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsUrl,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  contributions?: string;

  @IsArray()
  @IsString({ each: true })
  stack?: string[];

  @IsString()
  // @IsNotEmpty()
  @IsOptional()
  challenges?: string;

  @IsString()
  // @IsNotEmpty()
  @IsOptional()
  achievements?: string;

  @IsOptional()
  @IsUrl()
  link?: string;

  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @IsOptional()
  @IsUrl()
  liveUrl?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}