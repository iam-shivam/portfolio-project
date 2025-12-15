import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const slug = this.generateSlug(createBlogDto.title || 'untitled');
    
    const blog = this.blogRepository.create({
      ...createBlogDto,
      slug,
      publishedAt: new Date(createBlogDto.publishedAt || Date.now()),
    });

    return await this.blogRepository.save(blog);
  }

  async findAll(published?: boolean): Promise<Blog[]> {
    const where = published !== undefined ? { published } : {};
    
    return await this.blogRepository.find({
      where,
      order: { publishedAt: 'DESC' },
    });
  }

  async findOne(slug: string): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { slug } });

    if (!blog) {
      throw new NotFoundException(`Blog post with slug "${slug}" not found`);
    }

    // Increment views
    blog.views = (blog.views || 0) + 1;
    await this.blogRepository.save(blog);

    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { id } });

    if (!blog) {
      throw new NotFoundException(`Blog post with id "${id}" not found`);
    }

    // Update slug if title changes
    const updateData: any = { ...updateBlogDto };
    if (updateBlogDto.title && updateBlogDto.title !== blog.title) {
      updateData.slug = this.generateSlug(updateBlogDto.title);
    }

    Object.assign(blog, updateData);
    return await this.blogRepository.save(blog);
  }

  async remove(id: string): Promise<void> {
    const result = await this.blogRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Blog post with id "${id}" not found`);
    }
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // Get blog statistics
  async getStats() {
    const totalBlogs = await this.blogRepository.count();
    const publishedBlogs = await this.blogRepository.count({
      where: { published: true },
    });
    const totalViews = await this.blogRepository
      .createQueryBuilder('blog')
      .select('SUM(blog.views)', 'total')
      .getRawOne();

    return {
      totalBlogs,
      publishedBlogs,
      totalViews: totalViews.total || 0,
    };
  }
}