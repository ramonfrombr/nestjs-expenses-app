import { TipoRelatorio, IRelatorio } from './dados';
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

import { AppService } from './app.service';

@Controller('relatorio/:tipo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  selecionarTodosRelatorios(@Param('tipo') tipo: string): IRelatorio[] {
    const tipoRelatorio =
      tipo === 'ganho' ? TipoRelatorio.GANHO : TipoRelatorio.GASTO;

    return this.appService.selecionarTodosRelatorios(tipoRelatorio);
  }

  @Get(':id')
  selecionarRelatorio(@Param('tipo') tipo: string, @Param('id') id: string) {
    const tipoRelatorio =
      tipo === 'ganho' ? TipoRelatorio.GANHO : TipoRelatorio.GASTO;

    return this.appService.selecionarRelatorioPeloId(tipoRelatorio, id);
  }

  @Post('')
  criarRelatorio(
    @Body()
    { quantidade, origem } /*body*/ : { origem: string; quantidade: number },
    @Param('tipo') tipo: TipoRelatorio,
  ) {
    const tipoRelatorio =
      tipo === 'ganho' ? TipoRelatorio.GANHO : TipoRelatorio.GASTO;

    return this.appService.criarRelatorio(tipoRelatorio, {
      quantidade,
      origem,
    });
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

    return this.appService.atualizarRelatorio(tipoRelatorio, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  apagarRelatorio(@Param('id') id: string) {
    return this.appService.apagarRelatorio(id);
  }
}

// http://localhost:3000/relatorio/ganhos/:id
// http://localhost:3000/relatorio/gastos/:id
