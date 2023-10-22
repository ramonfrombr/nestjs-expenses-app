import { TipoRelatorio, dados, IRelatorio } from './dados';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

interface IDadosRelatorio {
  quantidade: number;
  origem: string;
}

interface IAtualizarRelatorio {
  quantidade?: number;
  origem?: string;
}

@Injectable()
export class AppService {
  selecionarTodosRelatorios(tipo: TipoRelatorio) {
    return dados.relatorios.filter((relatorio) => relatorio.tipo === tipo);
  }

  selecionarRelatorioPeloId(tipo: TipoRelatorio, id: string) {
    return dados.relatorios
      .filter((relatorio) => relatorio.tipo === tipo)
      .find((relatorio) => relatorio.id === id);
  }

  criarRelatorio(tipo: TipoRelatorio, { quantidade, origem }: IDadosRelatorio) {
    const novoRelatorio: IRelatorio = {
      id: uuid(),
      origem,
      quantidade,
      data_criado: new Date(),
      data_atualizado: new Date(),
      tipo,
    };

    dados.relatorios.push(novoRelatorio);
    return novoRelatorio;
  }

  atualizarRelatorio(
    tipo: TipoRelatorio,
    id: string,
    body: IAtualizarRelatorio,
  ) {
    const relatorioParaAtualizar = dados.relatorios
      .filter((relatorio) => relatorio.tipo === tipo)
      .find((relatorio) => relatorio.id === id);

    if (!relatorioParaAtualizar) return;

    const indiceRelatorio = dados.relatorios.findIndex(
      (relatorio) => relatorio.id === relatorioParaAtualizar.id,
    );

    dados.relatorios[indiceRelatorio] = {
      ...dados.relatorios[indiceRelatorio],
      ...body,
      data_atualizado: new Date(),
    };

    return dados.relatorios[indiceRelatorio];
  }

  apagarRelatorio(id: string) {
    const indiceRelatorio = dados.relatorios.findIndex(
      (relatorio) => relatorio.id === id,
    );

    if (indiceRelatorio === -1) return;

    dados.relatorios.splice(indiceRelatorio, 1);

    return;
  }
}
