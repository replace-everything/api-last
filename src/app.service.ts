import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from './invoices/invoice.repository';
import { LeadRepository } from './leads/leads.repository';
// import { PhotoStorageService } from './photo-storage.service';
import { Lead } from './leads/entities/lead.entity';
import { User } from './users/entities/user.entity';
import { UserRepository } from './users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './invoices/entities/invoice.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: LeadRepository,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: InvoiceRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async getLeadsByUserId(userId: number): Promise<Lead[]> {
    const result = await this.leadRepository.findByUserId(userId);

    return result;
  }

  async getInvoicesByUserId(userId: number): Promise<Invoice[]> {
    const result = await this.invoiceRepository.findInvoicesByUid(userId);

    return result;
  }

  getHello() {
    const hello = 'Hello World!';
    console.log(hello);
    return hello;
  }

  // ! Need to define this once shape is known
  // async postPhoto(file: any): Promise<any> {
  //   return this.photoStorageService.storePhoto(file);
  // }
}
