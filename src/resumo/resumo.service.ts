import { Injectable } from '@nestjs/common';
import { TipoRelatorio } from 'src/dados';
import { RelatorioService } from 'src/relatorio/relatorio.service';

@Injectable()
export class ResumoService {
  constructor(private readonly relatorioService: RelatorioService) {}

  calcularResumo() {
    const gastoTotal = this.relatorioService
      .selecionarTodosRelatorios(TipoRelatorio.GASTO)
      .reduce((soma, relatorio) => (soma += relatorio.quantidade), 0);
    const ganhoTotal = this.relatorioService
      .selecionarTodosRelatorios(TipoRelatorio.GANHO)
      .reduce((soma, relatorio) => (soma += relatorio.quantidade), 0);

    return {
      ganhoTotal,
      gastoTotal,
      balanco: ganhoTotal - gastoTotal,
    };
  }
}
