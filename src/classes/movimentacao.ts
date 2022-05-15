import type TipoAndamento from "./tipoAndamento";
import type { TipoAndamentoTuple } from "./tipoAndamento";

export type MovimentacaoTuple = [string, string, string, string, number, TipoAndamentoTuple[]];

export default class Movimentacao {
  constructor(
    id: number,
    data: Date,
    texto: string,
    tiposAssuntos: TipoAndamento[],
    tipo?: string,
    juiz?: string
  ) {}

  static parseTuple(tuple: MovimentacaoTuple) {
    const [data, texto, tipo, juiz, id, tipos] = tuple;
    return new Movimentacao(id, new Date(data), texto, tipos, tipo, juiz);
  }
}
