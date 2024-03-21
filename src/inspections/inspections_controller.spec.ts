// import { Test, TestingModule } from '@nestjs/testing';
// import { PQInspectionsController } from './inspections.controller';
// import { PQInspectionsService } from './inspections.service';
// import {
//   CreatePQInspectionDto,
//   UpdatePQInspectionDto,
// } from './dtos/inspection.dto';

// describe('PQInspectionsController', () => {
//   let controller: PQInspectionsController;
//   let service: PQInspectionsService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [PQInspectionsController],
//       providers: [
//         {
//           provide: PQInspectionsService,
//           useValue: {
//             create: jest.fn(),
//             findAll: jest.fn(),
//             findOne: jest.fn(),
//             update: jest.fn(),
//             remove: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     controller = module.get<PQInspectionsController>(PQInspectionsController);
//     service = module.get<PQInspectionsService>(PQInspectionsService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   it('should create an inspection', async () => {
//     const dto = new CreatePQInspectionDto();
//     const result = {}; // Mock data
//     jest.spyOn(service, 'create').mockImplementation(async () => result);
//     expect(await controller.create(dto)).toBe(result);
//   });

//   it('should retrieve all inspections', async () => {
//     const result = []; // Mock data
//     jest.spyOn(service, 'findAll').mockImplementation(async () => result);
//     expect(await controller.findAll()).toBe(result);
//   });

//   it('should retrieve a single inspection by id', async () => {
//     const id = 1;
//     const result = {}; // Mock data
//     jest.spyOn(service, 'findOne').mockImplementation(async () => result);
//     expect(await controller.findOne(id)).toBe(result);
//   });

//   it('should update an inspection', async () => {
//     const id = 1;
//     const dto = new UpdatePQInspectionDto();
//     const result = {}; // Mock data
//     jest.spyOn(service, 'update').mockImplementation(async () => result);
//     expect(await controller.update(id, dto)).toBe(result);
//   });

//   it('should delete an inspection', async () => {
//     const id = 1;
//     const result = {}; // Mock data
//     jest.spyOn(service, 'remove').mockImplementation(async () => result);
//     expect(await controller.remove(id)).toBe(result);
//   });
// });
