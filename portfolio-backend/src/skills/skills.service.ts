import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create(createSkillDto);
    return await this.skillRepository.save(skill);
  }

  async findAll(category?: string): Promise<Skill[]> {
    const where = category ? { category } : {};
    
    return await this.skillRepository.find({
      where,
      order: { order: 'ASC', name: 'ASC' },
    });
  }

  async findByCategory(): Promise<any> {
    const skills = await this.skillRepository.find({
      order: { order: 'ASC', name: 'ASC' },
    });

    return {
      backend: skills.filter((s) => s.category === 'backend'),
      database: skills.filter((s) => s.category === 'database'),
      frontend: skills.filter((s) => s.category === 'frontend'),
      other: skills.filter((s) => s.category === 'other'),
    };
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillRepository.findOne({ where: { id } });

    if (!skill) {
      throw new NotFoundException(`Skill with id "${id}" not found`);
    }

    return skill;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.findOne(id);
    Object.assign(skill, updateSkillDto);
    return await this.skillRepository.save(skill);
  }

  async remove(id: string): Promise<void> {
    const result = await this.skillRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Skill with id "${id}" not found`);
    }
  }
}