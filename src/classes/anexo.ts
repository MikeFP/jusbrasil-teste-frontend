export default class Anexo {
  constructor(
    id: number,
    urlDownload: string,
    tipo: TipoAnexo,
    dataPublicacao: Date,
    dataObtencao: Date,
    conteudo?: string,
    idMovimentacao?: number,
    titulo?: string
  ) {}

  static parseTuple(tuple: any[]) {
    const [id, urlDownload, tipo, dataPublicacao] = tuple.slice(0, 4);
    const conteudo = tuple.length == 8 ? tuple[4] : undefined;
    const remainingData = tuple.length == 7 ? tuple.slice(4) : tuple.slice(5);
    const [dataObtencao, idMovimentacao, titulo] = remainingData;
    return new Anexo(
      id,
      urlDownload,
      tipo,
      dataPublicacao,
      dataObtencao,
      conteudo,
      idMovimentacao,
      titulo
    );
  }
}

enum TipoAnexo {
  Inicial = 1,
  Sentenca = 2,
  Outros = 3,
  Ajuizamento = 4,
  Acordao = 5,
  Despacho = 6,
  Certidao = 7,
  Documento = 9,
  Procuracao = 10,
  Ata = 11,
  Laudo = 12,
}

namespace TipoAnexo {
  export function getDescricao(tipo: TipoAnexo) {
    return descricoesTiposAnexos[tipo];
  }
}

const descricoesTiposAnexos: any = {
  1: "Inicial",
  2: "Sentença",
  3: "Outros",
  4: "Ajuizamento",
  5: "Acordão",
  6: "Despacho",
  7: "Certidão",
  9: "Documento",
  10: "Procuração",
  11: "Ata",
  12: "Laudo",
};

export { TipoAnexo };
