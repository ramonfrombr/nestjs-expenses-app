import { TipoRelatorio, dados, IRelatorio } from './dados';
import { Controller, Get, Put, Delete, Post, Param } from '@nestjs/common';

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
  selecionarRelatorio() {
    return {};
  }

  @Post('')
  criarRelatorio() {
    return 'Criado';
  }

  @Put(':id')
  atualizarRelatorio() {
    return 'Atualizado';
  }

  @Delete(':id')
  apagarRelatorio() {
    return 'Apagado';
  }
}

// http://localhost:3000/relatorio/ganhos/:id
// http://localhost:3000/relatorio/gastos/:id
