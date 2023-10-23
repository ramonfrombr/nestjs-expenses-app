import { Test, TestingModule } from '@nestjs/testing';
import { ResumoController } from './resumo.controller';

describe('ResumoController', () => {
  let controller: ResumoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumoController],
    }).compile();

    controller = module.get<ResumoController>(ResumoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
