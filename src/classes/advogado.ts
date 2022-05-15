export type AdvogadoTuple = [number, string, string, string, string];

export default class Advogado {
  constructor(
    public id: number,
    public nome: string,
    public oab: string,
    public cpf: string,
    public uf: string
  ) {}

  static parseTuple(tuple: AdvogadoTuple) {
    return new Advogado(...tuple);
  }
}
