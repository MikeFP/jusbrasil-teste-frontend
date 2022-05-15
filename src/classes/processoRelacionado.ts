import type Instancia from "./instancia";

export default interface ProcessoRelacionado {
  id: number;
  numero: string;
  distribuicao_data: Date;
  codigo_identificador: string;
  instancia: Instancia;
  natureza: string;
  tribunal: string;
}
