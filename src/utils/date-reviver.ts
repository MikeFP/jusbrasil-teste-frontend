const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d)*)(?:Z|(\+|-)([\d|:]*))?$/;
const reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;

export default function dateReviver(key: string, value: any) {
  // first, just make sure the property is a string:
  if (typeof value === "string") {
    // then, use regex to see if it's an ISO-formatted string
    var a = reISO.exec(value);
    if (a) {
      // if so, Date() can parse it:
      return new Date(value);
    }
    // otherwise, see if it's a wacky Microsoft-format string:
    a = reMsAjax.exec(value);
    if (a) {
      // and perform some jujitsu to make use of it:
      var b = a[1].split(/[-+,.]/);
      return new Date(b[0] ? +b[0] : 0 - +b[1]);
    }
    // here, you could insert any additional tests and parse instructions you like, for other date syntaxes...
  }
  // important: you need to return any values you're not parsing, or they die...
  return value;
}
