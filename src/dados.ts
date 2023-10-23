export enum TipoRelatorio {
  GANHO = 'ganho',
  GASTO = 'gasto',
}

export const dados: Dados = {
  relatorios: [
    {
      id: 'uuid',
      origem: 'Salário',
      quantidade: 7500,
      data_criado: new Date(),
      data_atualizado: new Date(),
      tipo: TipoRelatorio.GANHO, //'gasto',
    },
    {
      id: 'uuid2',
      origem: 'Supermercado',
      quantidade: 1000,
      data_criado: new Date(),
      data_atualizado: new Date(),
      tipo: TipoRelatorio.GASTO, //'gasto',
    },
    {
      id: 'uuid3',
      origem: 'Shopping',
      quantidade: 500,
      data_criado: new Date(),
      data_atualizado: new Date(),
      tipo: TipoRelatorio.GASTO, //'gasto',
    },
  ],
};

interface Dados {
  relatorios: IRelatorio[];
}

export interface IRelatorio {
  id: string;
  origem: string;
  quantidade: number;
  data_criado: Date;
  data_atualizado: Date;
  tipo: TipoRelatorio; // 'gasto' | 'ganho';
}
