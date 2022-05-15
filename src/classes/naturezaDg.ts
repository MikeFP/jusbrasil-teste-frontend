enum NaturezaDg {
  Outros,
  Penal,
  Civel,
  Administrativo,
  Tributario,
  Trabalhista,
  Previdenciaria,
  Cautelar,
  Incidentes,
  Recursos,
  Remedios,
  Militar,
  JuizadoCivel,
  JuizadoFederal,
  JuizadoCriminal,
  STF,
  STJ,
  Arquivo,
  AcaoCivil,
}

const descricoesNaturezasDg = [
  "Outros",
  "Penal",
  "Cível",
  "Administrativo",
  "Tributário",
  "Trabalhista",
  "Previdenciária",
  "Cautelar ou Medida Pré-Processual",
  "Indicentes Processuais",
  "Recursos e Remédios Constitucionais",
  "Remédios Constitucionais",
  "Militar",
  "Juizado Especial Cível",
  "Juizado Especial Federal",
  "Juizado Especial Criminal",
  "Supremo Tribunal Federal",
  "Superior Tribunal de Justiça",
  "Arquivo",
  "Ação Civil Pública",
];

namespace NaturezaDg {
  export function getDescricao(natureza: NaturezaDg) {
    return descricoesNaturezasDg[natureza];
  }
}

export default NaturezaDg;
