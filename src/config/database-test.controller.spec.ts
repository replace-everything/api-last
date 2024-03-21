// import { Test, TestingModule } from '@nestjs/testing';
// import { ConfigService } from '@nestjs/config';
// import { DatabaseConfigService } from './database-config.service';

// describe('DatabaseConfigService', () => {
//   let service: DatabaseConfigService;
//   let mockConfigService: Partial<ConfigService>;

//   beforeEach(async () => {
//     // Mock implementation of ConfigService
//     mockConfigService = {
//       get: jest.fn((key: string) => {
//         const config = {
//           USE_DB: 'DBSUPERIORDEMO',
//           dbuacme_apidev_HOST: 'test_host',
//           dbuacme_apidev_PORT: 3306,
//           dbuacme_apidev_USER: 'test_user',
//           dbuacme_apidev_PASSWORD: 'test_password',
//           dbuacme_apidev_NAME: 'test_db',
//         };
//         return config[key];
//       }),
//     };

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         DatabaseConfigService,
//         { provide: ConfigService, useValue: mockConfigService },
//       ],
//     }).compile();

//     service = module.get<DatabaseConfigService>(DatabaseConfigService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('should return the correct database configuration', () => {
//     const dbConfig = service.getDatabaseConfig();
//     expect(dbConfig.host).toBe('test_host');
//     expect(dbConfig.port).toBe(3306);
//     expect(dbConfig.username).toBe('test_user');
//     expect(dbConfig.password).toBe('test_password');
//     expect(dbConfig.database).toBe('test_db');
//   });
// });
