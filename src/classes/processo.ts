import Anexo from "./anexo";
import Audiencia from "./audiencia";
import type Instancia from "./instancia";
import Movimentacao from "./movimentacao";
import type { MovimentacaoTuple } from "./movimentacao";
import type NaturezaDg from "./naturezaDg";
import ParteProcesso from "./parteProcesso";
import type { ParteProcessoTuple } from "./parteProcesso";
import type ProcessoRelacionado from "./processoRelacionado";

export interface IProcesso {
  processoID: number;
  numero: string;
  numeroAlternativo: string;
  anexos?: any[][];
  vara: string;
  vara_original: string;
  classeNatureza: string;
  classeNatureza_dg: NaturezaDg;
  movs?: MovimentacaoTuple[];
  distribuicaoTipo: string;
  situacao: string;
  juiz?: string;
  area: string;
  assuntoExtra: string;
  audiencias: string[][];
  extinto: number;
  valor?: number;
  alteradoEm?: Date;
  foro: string;
  foro_cnj: string;
  regional_cnj?: boolean;
  situacao_situacaoID?: number;
  sentencaData?: Date;
  comarca: string;
  comarca_cnj: string;
  tribunalID: number;
  tribunal: string;
  distribuicaoData: Date;
  arquivado: boolean;
  classes: any[];
  classes_cnj: any[];
  acessos: Date[];
  uf: string;
  criadoEm: Date;
  partes?: ParteProcessoTuple[];
  instancia: Instancia;
  fonte_sistema: string;
  polo: number;
  flag: number;
  processosRelacionados: ProcessoRelacionado[];
  liminar?: boolean;
  gratuita?: boolean;
  segredo_justica: boolean;
}

export default class Processo {
  constructor(
    public processoId: number,
    public numero: string,
    public numeroAlternativo: string,
    public vara: string,
    public vara_original: string,
    public classeNatureza: string,
    public classeNatureza_dg: NaturezaDg,
    public distribuicaoTipo: string,
    public situacao: string,
    public area: string,
    public assuntoExtra: string,
    public audiencias: Audiencia[],
    public extinto: number,
    public foro: string,
    public foro_cnj: string,
    public comarca: string,
    public comarca_cnj: string,
    public tribunalID: number,
    public tribunal: string,
    public distribuicaoData: Date,
    public arquivado: boolean,
    public classes: any[],
    public classes_cnj: any[],
    public acessos: Date[],
    public uf: string,
    public criadoEm: Date,
    public instancia: Instancia,
    public fonte_sistema: string,
    public polo: number,
    public flag: number,
    public processosRelacionados: ProcessoRelacionado[],
    public segredo_justica: boolean,
    public anexos?: Anexo[],
    public movs?: Movimentacao[],
    public juiz?: string,
    public valor?: number,
    public alteradoEm?: Date,
    public regional_cnj?: boolean,
    public situacao_situacaoID?: number,
    public sentencaData?: Date,
    public partes?: ParteProcesso[],
    public liminar?: boolean,
    public gratuita?: boolean
  ) {}

  static parse(obj: IProcesso) {
    return new Processo(
      obj.processoID,
      obj.numero,
      obj.numeroAlternativo,
      obj.vara,
      obj.vara_original,
      obj.classeNatureza,
      obj.classeNatureza_dg,
      obj.distribuicaoTipo,
      obj.situacao,
      obj.area,
      obj.assuntoExtra,
      obj.audiencias.map((tuple) => Audiencia.parseTuple(tuple)),
      obj.extinto,
      obj.foro,
      obj.foro_cnj,
      obj.comarca,
      obj.comarca_cnj,
      obj.tribunalID,
      obj.tribunal,
      obj.distribuicaoData,
      obj.arquivado,
      obj.classes,
      obj.classes_cnj,
      obj.acessos,
      obj.uf,
      obj.criadoEm,
      obj.instancia,
      obj.fonte_sistema,
      obj.polo,
      obj.flag,
      obj.processosRelacionados,
      obj.segredo_justica,
      obj.anexos.map((tuple) => Anexo.parseTuple(tuple)),
      obj.movs.map((tuple) => Movimentacao.parseTuple(tuple)),
      obj.juiz,
      obj.valor,
      obj.alteradoEm,
      obj.regional_cnj,
      obj.situacao_situacaoID,
      obj.sentencaData,
      obj.partes.map((tuple) => ParteProcesso.parseTuple(tuple)),
      obj.liminar,
      obj.gratuita
    );
  }
}
