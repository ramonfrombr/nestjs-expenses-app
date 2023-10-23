import { TipoRelatorio } from '../dados';
import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { RelatorioService } from './relatorio.service';
import {
  CriarRelatorioDTO,
  AtualizarRelatorioDTO,
  RelatorioResponseDTO,
} from '../dtos/relatorio.dto';

@Controller('relatorio/:tipo')
export class RelatorioController {
  constructor(private readonly relatorioService: RelatorioService) {}

  @Get()
  selecionarTodosRelatorios(
    @Param('tipo', new ParseEnumPipe(TipoRelatorio)) tipo: string,
  ): RelatorioResponseDTO[] {
    const tipoRelatorio =
      tipo === 'ganho' ? TipoRelatorio.GANHO : TipoRelatorio.GASTO;

    return this.relatorioService.selecionarTodosRelatorios(tipoRelatorio);
  }

  @Get(':id')
  selecionarRelatorio(
    @Param('tipo', new ParseEnumPipe(TipoRelatorio)) tipo: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): RelatorioResponseDTO {
    const tipoRelatorio =
      tipo === 'ganho' ? TipoRelatorio.GANHO : TipoRelatorio.GASTO;

    return this.relatorioService.selecionarRelatorioPeloId(tipoRelatorio, id);
  }

  @Post('')
  criarRelatorio(
    @Body() { quantidade, origem }: CriarRelatorioDTO,
    @Param('tipo', new ParseEnumPipe(TipoRelatorio)) tipo: TipoRelatorio,
  ): RelatorioResponseDTO {
    const tipoRelatorio =
      tipo === 'ganho' ? TipoRelatorio.GANHO : TipoRelatorio.GASTO;

    return this.relatorioService.criarRelatorio(tipoRelatorio, {
      quantidade,
      origem,
    });
  }

  @Put(':id')
  atualizarRelatorio(
    @Param('tipo', new ParseEnumPipe(TipoRelatorio)) tipo: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    body /*body*/ : AtualizarRelatorioDTO,
  ): RelatorioResponseDTO {
    console.log(body);
    const tipoRelatorio =
      tipo === 'ganho' ? TipoRelatorio.GANHO : TipoRelatorio.GASTO;

    return this.relatorioService.atualizarRelatorio(tipoRelatorio, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  apagarRelatorio(@Param('id', ParseUUIDPipe) id: string) {
    return this.relatorioService.apagarRelatorio(id);
  }
}

// http://localhost:3000/relatorio/ganhos/:id
// http://localhost:3000/relatorio/gastos/:id
