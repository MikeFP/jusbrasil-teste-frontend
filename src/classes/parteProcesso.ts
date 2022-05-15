import Advogado, { type AdvogadoTuple } from "./advogado";

export type ParteProcessoTuple = [
  number,
  number,
  string,
  string,
  number,
  number,
  string,
  number,
  string,
  AdvogadoTuple,
  boolean,
  boolean,
  boolean,
  boolean,
  number,
  string,
  boolean
];

export default class ParteProcesso {
  constructor(
    id: number,
    idParticipacao: number,
    nome: string,
    nomeNormalizado: string,
    parteRelacaoId: number,
    relacaoNormalizado: string,
    advogados: Advogado[],
    autora: boolean,
    coautora: boolean,
    re: boolean,
    neutra: boolean,
    fisica: boolean,
    cnpj?: number,
    cpf?: number,
    documento?: string,
    cep?: number,
    idMonitorada?: string
  ) {}

  static parseTuple(tuple: ParteProcessoTuple) {
    const [
      id,
      idParticipacao,
      nome,
      nomeNormalizado,
      cnpj,
      cpf,
      documento,
      parteRelacaoId,
      relacaoNormalizado,
      advogados,
      autora,
      coautora,
      re,
      neutra,
      cep,
      idMonitorada,
      fisica,
    ] = tuple;
    return new ParteProcesso(
      id,
      idParticipacao,
      nome,
      nomeNormalizado,
      parteRelacaoId,
      relacaoNormalizado,
      (advogados as any[]).map((a) => Advogado.parseTuple(a)),
      autora,
      coautora,
      re,
      neutra,
      fisica,
      cnpj,
      cpf,
      documento,
      cep,
      idMonitorada
    );
  }
}
