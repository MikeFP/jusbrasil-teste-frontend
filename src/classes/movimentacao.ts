import TipoAndamento from "./tipoAndamento";
import type { TipoAndamentoTuple } from "./tipoAndamento";

export type MovimentacaoTuple = [string, string, string, string, number, TipoAndamentoTuple[]];

export default class Movimentacao {
  constructor(
    public id: number,
    public data: Date,
    public texto: string,
    public tiposNormalizados: TipoAndamento[],
    public tipo?: string,
    public juiz?: string
  ) {}

  static parseTuple(tuple: MovimentacaoTuple) {
    const [data, tipo, texto, juiz, id, tipos] = tuple;
    return new Movimentacao(
      id,
      new Date(data),
      texto,
      tipos.map((tuple) => TipoAndamento.parseTuple(tuple)),
      tipo,
      juiz
    );
  }
}
