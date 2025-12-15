import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  excerpt?: string;

  @IsString()
  @IsNotEmpty()
  content?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsString()
  @IsNotEmpty()
  author?: string;

  @IsDateString()
  publishedAt?: string;

  @IsOptional()
  @IsNumber()
  readTime?: number;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}