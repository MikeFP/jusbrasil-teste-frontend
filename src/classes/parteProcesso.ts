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
    public id: number,
    public idParticipacao: number,
    public nome: string,
    public nomeNormalizado: string,
    public parteRelacaoId: number,
    public relacaoNormalizado: string,
    public advogados: Advogado[],
    public autora: boolean,
    public coautora: boolean,
    public re: boolean,
    public neutra: boolean,
    public fisica: boolean,
    public cnpj?: number,
    public cpf?: number,
    public documento?: string,
    public cep?: number,
    public idMonitorada?: string
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
