import { describe, expect, test } from "vitest";

import { match } from "./match";

describe("match", () => {
  test("match locale from supported", () => {
    const matched = match("pt-br", ["en", "pt-br"]);
    expect(matched).toBe("pt-br");
  });

  test("ignores case", () => {
    const matched = match("PT-BR", ["en", "pt-br"]);
    expect(matched).toBe("pt-br");
  });

  test("partial matches", () => {
    const matched = match("PT", ["en", "pt-br"]);
    expect(matched).toBe("pt-br");
  });

  test("holds to complete match", () => {
    const matched = match("en", ["pt-br", "en-us", "en", "en-uk"]);
    expect(matched).toBe("en");
  });

  test("returns the first supported if none is passed", () => {
    const matched = match(null, ["en", "pt-br"]);
    expect(matched).toBe("en");
  });

  test("returns the first supported if none is found", () => {
    const matched = match("es", ["en", "pt-br"]);
    expect(matched).toBe("en");
  });
});
