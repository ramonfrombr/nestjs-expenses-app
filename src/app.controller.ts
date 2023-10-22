import { TipoRelatorio, dados, IRelatorio } from './dados';
import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';

import { v4 as uuid } from 'uuid';

@Controller('relatorio/:tipo')
export class AppController {
  @Get('')
  selecionarTodosRelatorios(@Param('tipo') tipo: string): IRelatorio[] {
    const tipoRelatorio =
      tipo === 'ganho' ? TipoRelatorio.GANHO : TipoRelatorio.GASTO;

    return dados.relatorios.filter(
      (relatorio) => relatorio.tipo === tipoRelatorio,
    );
  }

  @Get(':id')
  selecionarRelatorio(@Param('tipo') tipo: string, @Param('id') id: string) {
    const tipoRelatorio =
      tipo === 'ganho' ? TipoRelatorio.GANHO : TipoRelatorio.GASTO;

    return dados.relatorios
      .filter((relatorio) => relatorio.tipo === tipoRelatorio)
      .find((relatorio) => relatorio.id === id);
  }

  @Post('')
  criarRelatorio(
    @Body()
    { quantidade, origem } /*body*/ : { origem: string; quantidade: number },
    @Param('tipo') tipo: string,
  ) {
    const novoRelatorio: IRelatorio = {
      id: uuid(),
      origem,
      quantidade,
      data_criado: new Date(),
      data_atualizado: new Date(),
      tipo: tipo === 'ganho' ? TipoRelatorio.GANHO : TipoRelatorio.GASTO,
    };

    dados.relatorios.push(novoRelatorio);
    return novoRelatorio;
  }

  @Put(':id')
  atualizarRelatorio(
    @Param('tipo') tipo: string,
    @Param('id') id: string,
    @Body()
    body /*body*/ : { origem: string; quantidade: number },
  ) {
    const tipoRelatorio =
      tipo === 'ganho' ? TipoRelatorio.GANHO : TipoRelatorio.GASTO;

    const relatorioParaAtualizar = dados.relatorios
      .filter((relatorio) => relatorio.tipo === tipoRelatorio)
      .find((relatorio) => relatorio.id === id);

    if (!relatorioParaAtualizar) return;

    const indiceRelatorio = dados.relatorios.findIndex(
      (relatorio) => relatorio.id === relatorioParaAtualizar.id,
    );

    dados.relatorios[indiceRelatorio] = {
      ...dados.relatorios[indiceRelatorio],
      ...body,
    };

    return dados.relatorios[indiceRelatorio];
  }

  @HttpCode(204)
  @Delete(':id')
  apagarRelatorio(@Param('id') id: string) {
    const indiceRelatorio = dados.relatorios.findIndex(
      (relatorio) => relatorio.id === id,
    );

    if (indiceRelatorio === -1) return;

    dados.relatorios.splice(indiceRelatorio, 1);

    return;
  }
}

// http://localhost:3000/relatorio/ganhos/:id
// http://localhost:3000/relatorio/gastos/:id
