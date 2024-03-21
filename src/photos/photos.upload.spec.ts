// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Lambda } from '@aws-sdk/client-lambda';
// import { S3Client } from '@aws-sdk/client-s3';
// import { Repository } from 'typeorm';
// import { CreatePhotoDto } from './dto/create-photo.dto';
// import { PhotoDTO } from './dto/photos.dto';
// import { PhotosService } from './photos.service';

// const s3Client = new S3Client({ region: 'us-east-1' });

// describe('PhotosService', () => {
//   let service: PhotosService;
//   let mockRepository: Partial<Repository<PhotoDTO>>;
//   let mockLambda: Partial<Lambda>;

//   beforeEach(async () => {
//     mockRepository = {
//       create: jest.fn().mockImplementation((dto) => dto),
//       save: jest.fn().mockImplementation((entity) => Promise.resolve(entity)),
//       findOne: jest
//         .fn()
//         .mockImplementation((id) =>
//           Promise.resolve({ photoid: id, ...new PhotoDTO() }),
//         ),
//       // Add other implementations as needed for your tests
//     };

//     mockLambda = {
//       invoke: jest.fn().mockImplementation(() => ({
//         promise: jest.fn().mockResolvedValue({
//           StatusCode: 200,
//           Payload: JSON.stringify({
//             photoId: 1,
//             photoext: 'jpg',
//             puser: 1103,
//           }),
//         }),
//       })),
//     };

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         PhotosService,
//         { provide: getRepositoryToken(PhotoDTO), useValue: mockRepository },
//         { provide: S3Client, useValue: s3Client }, // Use the s3Client instance here
//         { provide: Lambda, useValue: mockLambda },
//       ],
//     }).compile();

//     service = module.get<PhotosService>(PhotosService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   // Add tests for `create` method
//   it('should create a new photo record', async () => {
//     const createDto = new CreatePhotoDto();
//     const result = await service.create(createDto);
//     expect(mockRepository.create).toHaveBeenCalled();
//     expect(mockRepository.save).toHaveBeenCalledWith(createDto);
//     expect(result).toEqual(createDto);
//   });

//   // Add more tests for additional methods in your service
// });
