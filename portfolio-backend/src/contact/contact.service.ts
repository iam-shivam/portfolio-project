import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = this.contactRepository.create(createContactDto);
    return await this.contactRepository.save(contact);
  }

  async findAll(): Promise<Contact[]> {
    return await this.contactRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: string): Promise<Contact> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    contact!.read = true;
    return await this.contactRepository.save(contact || {} );
  }

  async remove(id: string): Promise<void> {
    await this.contactRepository.delete(id);
  }
}