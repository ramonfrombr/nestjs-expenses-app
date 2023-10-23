import { TipoRelatorio, dados, IRelatorio } from '../dados';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { RelatorioResponseDTO } from '../dtos/relatorio.dto';

interface IDadosRelatorio {
  quantidade: number;
  origem: string;
}

interface IAtualizarRelatorio {
  quantidade?: number;
  origem?: string;
}

@Injectable()
export class RelatorioService {
  selecionarTodosRelatorios(tipo: TipoRelatorio): RelatorioResponseDTO[] {
    return dados.relatorios
      .filter((relatorio) => relatorio.tipo === tipo)
      .map((relatorio) => new RelatorioResponseDTO(relatorio));
  }

  selecionarRelatorioPeloId(
    tipo: TipoRelatorio,
    id: string,
  ): RelatorioResponseDTO {
    const relatorio = dados.relatorios
      .filter((relatorio) => relatorio.tipo === tipo)
      .find((relatorio) => relatorio.id === id);

    if (!relatorio) return;

    return new RelatorioResponseDTO(relatorio);
  }

  criarRelatorio(
    tipo: TipoRelatorio,
    { quantidade, origem }: IDadosRelatorio,
  ): RelatorioResponseDTO {
    const novoRelatorio: IRelatorio = {
      id: uuid(),
      origem,
      quantidade,
      data_criado: new Date(),
      data_atualizado: new Date(),
      tipo,
    };

    dados.relatorios.push(novoRelatorio);

    return new RelatorioResponseDTO(novoRelatorio);
  }

  atualizarRelatorio(
    tipo: TipoRelatorio,
    id: string,
    body: IAtualizarRelatorio,
  ): RelatorioResponseDTO {
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

    return new RelatorioResponseDTO(dados.relatorios[indiceRelatorio]);
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
