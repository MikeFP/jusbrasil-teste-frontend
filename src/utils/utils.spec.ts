import { assert, expect } from "chai";
import { describe, it } from "vitest";
import dateReviver from "./date-reviver";
import { isValidCnj } from "./validators";

describe("date reviver", () => {
  it("ISO date string is parsed as Date", () => {
    const date = new Date();
    const obj = {
      date: date.toISOString(),
    };
    const parsedObj: {
      date: any;
    } = JSON.parse(JSON.stringify(obj), dateReviver);
    assert.typeOf(parsedObj.date, "Date");
  });

  it("date-only string is parsed as Date", () => {
    const date = new Date();
    const obj = {
      date: date.toISOString().slice(0, 10),
    };
    const parsedObj: {
      date: any;
    } = JSON.parse(JSON.stringify(obj), dateReviver);
    assert.typeOf(parsedObj.date, "Date");
  });

  it("ISO date is equivalent to value", () => {
    const date = new Date();
    const obj = {
      date: date.toISOString(),
    };
    const parsedObj: {
      date: Date;
    } = JSON.parse(JSON.stringify(obj), dateReviver);
    expect(parsedObj.date.toISOString()).equals(date.toISOString());
  });

  it("date-only string is equivalent to value", () => {
    const date = new Date();
    const obj = {
      date: date.toISOString().slice(0, 10),
    };
    const parsedObj: {
      date: Date;
    } = JSON.parse(JSON.stringify(obj), dateReviver);
    expect(parsedObj.date.getFullYear()).equals(date.getFullYear());
    expect(parsedObj.date.getMonth()).equals(date.getMonth());
    expect(parsedObj.date.getDate()).equals(date.getDate());
  });
});

describe("cnj validator", () => {
  const cnj = "0000000-00.0000.0.00.0000";
  it("returns true if value is valid", () => {
    assert(isValidCnj(cnj));
  });

  it("returns error if value is invalid", () => {
    const val = cnj.replace("-", ".");
    assert.typeOf(isValidCnj(val), "string");
    assert.typeOf(isValidCnj(""), "string");
  });
});
