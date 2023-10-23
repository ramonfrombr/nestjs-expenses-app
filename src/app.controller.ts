import { TipoRelatorio } from './dados';
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
import { AppService } from './app.service';
import {
  CriarRelatorioDTO,
  AtualizarRelatorioDTO,
  RelatorioResponseDTO,
} from './dtos/relatorio.dto';

@Controller('relatorio/:tipo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  selecionarTodosRelatorios(
    @Param('tipo', new ParseEnumPipe(TipoRelatorio)) tipo: string,
  ): RelatorioResponseDTO[] {
    const tipoRelatorio =
      tipo === 'ganho' ? TipoRelatorio.GANHO : TipoRelatorio.GASTO;

    return this.appService.selecionarTodosRelatorios(tipoRelatorio);
  }

  @Get(':id')
  selecionarRelatorio(
    @Param('tipo', new ParseEnumPipe(TipoRelatorio)) tipo: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): RelatorioResponseDTO {
    const tipoRelatorio =
      tipo === 'ganho' ? TipoRelatorio.GANHO : TipoRelatorio.GASTO;

    return this.appService.selecionarRelatorioPeloId(tipoRelatorio, id);
  }

  @Post('')
  criarRelatorio(
    @Body() { quantidade, origem }: CriarRelatorioDTO,
    @Param('tipo', new ParseEnumPipe(TipoRelatorio)) tipo: TipoRelatorio,
  ): RelatorioResponseDTO {
    const tipoRelatorio =
      tipo === 'ganho' ? TipoRelatorio.GANHO : TipoRelatorio.GASTO;

    return this.appService.criarRelatorio(tipoRelatorio, {
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

    return this.appService.atualizarRelatorio(tipoRelatorio, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  apagarRelatorio(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.apagarRelatorio(id);
  }
}

// http://localhost:3000/relatorio/ganhos/:id
// http://localhost:3000/relatorio/gastos/:id
