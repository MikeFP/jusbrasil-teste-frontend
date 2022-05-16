const cnjRegex = /^\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}$/;
export const cnjMask = "#######-##.####.#.##.####";

export function isValidCnj(value: string) {
  if (value && value !== "" && cnjRegex.exec(value)) {
    return true;
  }
  return "Insira um CNJ válido";
}
