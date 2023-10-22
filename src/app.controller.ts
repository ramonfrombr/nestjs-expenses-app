import { Controller, Get, Put, Delete, Post } from '@nestjs/common';

@Controller('relatorio/:tipo')
export class AppController {
  @Get('')
  selecionarTodosRelatorios() {
    return [];
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
