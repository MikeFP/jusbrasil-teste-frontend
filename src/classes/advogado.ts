export type AdvogadoTuple = [number, string, string, string, string];

export default class Advogado {
  constructor(id: number, nome: string, oab: string, cpf: string, uf: string) {}

  static parseTuple(tuple: AdvogadoTuple) {
    return new Advogado(...tuple);
  }
}
