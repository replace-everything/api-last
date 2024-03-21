import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { PaginationPipe } from '../common/pipes/pagination.pipe';

describe('InvoicesController', () => {
  let controller: InvoicesController;
  let service: InvoicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoicesController],
      providers: [
        {
          provide: InvoicesService,
          useValue: {
            findAll: jest.fn(),
            findInvoicesByUid: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InvoicesController>(InvoicesController);
    service = module.get<InvoicesService>(InvoicesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should retrieve all invoices', async () => {
    const pagination = new PaginationPipe();
    const result = []; // Mock data
    jest.spyOn(service, 'findAll').mockImplementation(async () => result);
    expect(await controller.getAllInvoices(pagination)).toBe(result);
  });

  it('should retrieve invoices by user ID', async () => {
    const userId = 1;
    const pagination = new PaginationPipe();
    const result = []; // Mock data as array of Invoice
    jest
      .spyOn(service, 'findInvoicesByUid')
      .mockImplementation(async () => result);
    expect(await controller.findInvoicesByUid(userId, pagination)).toBe(result);
  });
});
