import { Module } from '@nestjs/common';
import { ResumoController } from './resumo.controller';
import { ResumoService } from './resumo.service';
import { RelatorioModule } from 'src/relatorio/relatorio.module';

@Module({
  imports: [RelatorioModule],
  controllers: [ResumoController],
  providers: [ResumoService],
})
export class ResumoModule {}
