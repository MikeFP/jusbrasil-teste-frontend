export default interface Processo {
  numero: string;
  numeroAlternativo: number;
  anexos: any[];
  vara: string;
  vara_original: string;
  classeNatureza: string;
  movs: any[];
  distribuicaoTipo: string;
  situacao: string;
  juiz: string;
  area: string;
  assuntoExtra: string;
  audiencias: string[];
  extinto: number;
  valor: number;
  alteradoEm: Date;
  foro: string;
  situacao_situacaoID: number;
  sentencaData: Date;
  comarca: string;
  tribunalID: number;
  tribunal: string;
  processoID: number;
  distribuicaoData: Date;
  arquivado: boolean;
  classes: any[];
  acessos: Date[];
  uf: string;
  criadoEm: Date;
  partes: any[];
}
