import { Controller, Get } from '@nestjs/common';
import { ResumoService } from './resumo.service';

@Controller('resumo')
export class ResumoController {
  constructor(private readonly resumoService: ResumoService) {}

  @Get()
  selecionarResumo() {
    return this.resumoService.calcularResumo();
  }
}
