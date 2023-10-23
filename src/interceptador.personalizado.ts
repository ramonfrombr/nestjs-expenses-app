import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs';

export class InterceptadorPersonalizado implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    console.log('Isto intercepta o pedido');
    console.log({ context });
    return handler.handle().pipe(
      map((dados) => {
        console.log('Isto intercepta a resposta');
        console.log({ dados });

        const resposta = {
          ...dados,
          dataCriado: dados.data_criado,
        };

        delete resposta.data_criado;
        delete resposta.data_atualizado;
        return resposta;
      }),
    );
  }
}
