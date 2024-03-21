// import { Test, TestingModule } from '@nestjs/testing';
// import { AppController } from './app.controller';
// import { PaginationPipe } from './common/pipes/pagination.pipe';
// import { InvoicesService } from './invoices/invoices.service';
// import { LeadsService } from './leads/leads.service';
// import { UsersService } from './users/users.service';

// describe('AppController', () => {
//   let appController: AppController;
//   let usersService: UsersService;
//   let leadsService: LeadsService;
//   let invoicesService: InvoicesService;

//   beforeEach(async () => {
//     // Mocking the services
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AppController],
//       providers: [
//         {
//           provide: UsersService,
//           useValue: {
//             findAll: jest.fn(),
//           },
//         },
//         {
//           provide: LeadsService,
//           useValue: {
//             findAll: jest.fn(),
//           },
//         },
//         {
//           provide: InvoicesService,
//           useValue: {
//             findAll: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     appController = module.get<AppController>(AppController);
//     usersService = module.get<UsersService>(UsersService);
//     leadsService = module.get<LeadsService>(LeadsService);
//     invoicesService = module.get<InvoicesService>(InvoicesService);
//   });

//   describe('getAllLeads', () => {
//     it('should return an array of leads', async () => {
//       const result = [];
//       jest
//         .spyOn(leadsService, 'findAll')
//         .mockImplementation(() => Promise.resolve(result));

//       expect(await appController.getAllLeads(new PaginationPipe())).toBe(
//         result,
//       );
//     });
//   });

//   describe('getAllInvoices', () => {
//     it('should return an array of invoices', async () => {
//       const result = [];
//       jest
//         .spyOn(invoicesService, 'findAll')
//         .mockImplementation(() => Promise.resolve(result));

//       expect(await appController.getAllInvoices(new PaginationPipe())).toBe(
//         result,
//       );
//     });
//   });

//   describe('getAllUsers', () => {
//     it('should return an array of users', async () => {
//       const result = [];
//       jest
//         .spyOn(usersService, 'findAll')
//         .mockImplementation(() => Promise.resolve(result));

//       expect(await appController.getAllUsers(new PaginationPipe())).toBe(
//         result,
//       );
//     });
//   });
// });
