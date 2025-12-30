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
  // @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  // @IsNotEmpty()
  excerpt?: string;

  @IsString()
  @IsOptional()
  // @IsNotEmpty()
  content?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  author?: string;

  @IsDateString()
  @IsOptional()
  publishedAt?: string;

  @IsOptional()
  @IsNumber()
  readTime?: number;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}