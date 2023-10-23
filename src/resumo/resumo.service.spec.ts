import { Test, TestingModule } from '@nestjs/testing';
import { ResumoService } from './resumo.service';

describe('ResumoService', () => {
  let service: ResumoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResumoService],
    }).compile();

    service = module.get<ResumoService>(ResumoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
