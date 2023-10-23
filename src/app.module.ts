import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { InterceptadorPersonalizado } from './interceptador.personalizado';
import { ResumoModule } from './resumo/resumo.module';
import { RelatorioModule } from './relatorio/relatorio.module';

@Module({
  imports: [ResumoModule, RelatorioModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor /*InterceptadorPersonalizado*/,
    },
  ],
})
export class AppModule {}
