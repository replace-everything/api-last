import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  // async getLeadsByUserId(userId: number): Promise<Lead[]> {
  //   const result = await this.leadRepository.findByUserId(userId);

  //   return result;
  // }

  // async getInvoicesByUserId(userId: number): Promise<Invoice[]> {
  //   const result = await this.invoiceRepository.findInvoicesByUid(userId);

  //   return result;
  // }

  // getHello() {
  //   const hello = 'Hello World!';
  //   console.log(hello);
  //   return hello;
  // }

  // ! Need to define this once shape is known
  // async postPhoto(file: any): Promise<any> {
  //   return this.photoStorageService.storePhoto(file);
  // }
}
