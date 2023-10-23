import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { TipoRelatorio } from 'src/dados';

export class CriarRelatorioDTO {
  @IsNumber()
  @IsPositive()
  quantidade: number;

  @IsString()
  @IsNotEmpty()
  origem: string;
}

export class AtualizarRelatorioDTO {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  quantidade: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  origem: string;
}

export class RelatorioResponseDTO {
  id: string;
  origem: string;
  quantidade: number;

  @Expose({
    name: 'dataCriado',
  })
  transformarDataCriado() {
    return this.data_criado;
  }

  @Exclude()
  data_criado: Date;

  @Exclude()
  data_atualizado: Date;
  tipo: TipoRelatorio;

  constructor(parcial: Partial<RelatorioResponseDTO>) {
    Object.assign(this, parcial);
  }
}
