export const dados: Dados = {
  relatorios: [],
};

interface Dados {
  relatorios: IRelatorio[];
}

interface IRelatorio {
  id: string;
  origem: string;
  quantidade: number;
  data_criado: Date;
  data_atualizado: Date;
  tipo: TipoRelatorio; // 'gasto' | 'ganho';
}

enum TipoRelatorio {
  GANHO = 'ganho',
  GASTO = 'gasto',
}

dados.relatorios.push({
  id: 'uuid',
  origem: 'Salário',
  quantidade: 7500,
  data_criado: new Date(),
  data_atualizado: new Date(),
  tipo: TipoRelatorio.GANHO, //'gasto',
});
