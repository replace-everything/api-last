import { Test, TestingModule } from '@nestjs/testing';
import { FastifyRequest } from 'fastify';
import * as httpMocks from 'node-mocks-http';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';

describe('PhotosController', () => {
  let controller: PhotosController;
  let service: PhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotosController],
      providers: [
        {
          provide: PhotosService,
          useValue: {
            processIosPhoto: jest.fn().mockResolvedValue({
              message: 'iOS photo uploaded successfully',
            }),
            // Add other mocked methods as necessary
          },
        },
      ],
    }).compile();

    controller = module.get<PhotosController>(PhotosController);
    service = module.get<PhotosService>(PhotosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadIosPhoto', () => {
    it('should call photosService.processIosPhoto with the uploaded file', async () => {
      // Mock of the file to be uploaded
      const mockFile = {
        fieldname: 'file',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        buffer: Buffer.from('This is a test photo', 'utf-8'),
      };

      // Create a mock FastifyRequest that includes the file to be uploaded
      const req = httpMocks.createRequest<FastifyRequest>({
        method: 'POST',
        url: '/photos/upload/ios',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: {
          fieldname: 'file',
        },
      });

      // Mock the 'files' method provided by @fastify/multipart which returns a generator
      // that yields the file parts of the request.
      req.files = async function* () {
        yield { ...mockFile };
      }.bind(req);

      // Act: Call the uploadIosPhoto method of the controller
      const response = await controller.uploadIosPhoto(req);

      // Assert: Ensure that the response is what we expect and that the service's
      // processIosPhoto method has been called with the right parameters.
      expect(response).toEqual({ message: 'iOS photo uploaded successfully' });
      expect(service.processIosPhoto).toBeCalledWith(
        expect.objectContaining(mockFile),
      );
    });
  });
});
