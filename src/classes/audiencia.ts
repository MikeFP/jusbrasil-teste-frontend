export default class Audiencia {
  constructor(
    public local: string,
    public tipo: string,
    public data?: Date,
    public situacao?: string
  ) {}

  static parseTuple(tuple: string[]) {
    const data = tuple[0] === "00:00" ? undefined : new Date(tuple[0]);
    const situacao = tuple.length > 3 ? tuple[3] : undefined;
    return new Audiencia(tuple[1], tuple[2], data, situacao);
  }
}
