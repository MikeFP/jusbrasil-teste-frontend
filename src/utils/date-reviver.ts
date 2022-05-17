const reISO = /^((\d{4})-(\d{2})-(\d{2})(T(\d{2}):(\d{2}):(\d{2})((\.\d+)(Z|(\+|-))([\d|:]+)?)?)?)/;
const reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;

export default function dateReviver(key: string, value: any) {
  if (typeof value === "string") {
    var a = value.match(reISO);
    if (a && a.length > 0) {
      // Date parse is inconsistent if ISO string is in (YYYY-MM-DD)T format.
      // To avoid it, replace T with blank space.
      return new Date(a[0].replace(/T/, " "));
    }
    // Might be a wacky Microsoft-format string.
    a = reMsAjax.exec(value);
    if (a) {
      var b = a[1].split(/[-+,.]/);
      return new Date(b[0] ? +b[0] : 0 - +b[1]);
    }
  }
  return value;
}
