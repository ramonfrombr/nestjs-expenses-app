import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

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
