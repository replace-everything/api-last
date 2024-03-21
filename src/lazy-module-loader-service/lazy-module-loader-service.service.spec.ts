import { Test, TestingModule } from '@nestjs/testing';
import { LazyModuleLoaderServiceService } from './lazy-module-loader-service.service';

describe('LazyModuleLoaderServiceService', () => {
  let service: LazyModuleLoaderServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LazyModuleLoaderServiceService],
    }).compile();

    service = module.get<LazyModuleLoaderServiceService>(
      LazyModuleLoaderServiceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
