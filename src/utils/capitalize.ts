export default function capitalize(value: string) {
  let res = value.toLowerCase();
  res = res[0].toUpperCase() + res.substring(1);
  return res;
}
