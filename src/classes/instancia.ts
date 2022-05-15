enum Instancia {
  Primeira = 1,
  Segunda = 2,
  Especial = 3,
  Extraordinaria = 4,
}

namespace Instancia {
  export function getDescricao(instancia: Instancia) {
    return descricoesInstancias[instancia];
  }
}

const descricoesInstancias = [
  "1ª instância judicial estadual (TJ), federal (TRF), trabalhista (TRT)",
  "2ª instância judicial estadual (TJ), federal (TRF), trabalhista (TRT)",
  "Especial (STJ, STM, TST e TSE)",
  "Extraordinária (STF)",
];

export default Instancia;
