import { describe, expect, test } from "vitest";
import { extractSupported, matchLocale } from "./locales";

describe("locales", () => {
  const messages = {
    "en": {
      "sign-in": "sing in",
      "sign-out": "sign out",
    },
    "pt-br": {
      "sign-in": "entrar",
      "sign-out": "sair",
    },
  };

  describe("supported", () => {
    test("extract supported locales from messages", () => {
      const supported = extractSupported(messages);
      expect(supported).toEqual(["en", "pt-br"]);
    });

    test.each([null, "test", 1, undefined])("raises if not object", (data) => {
      expect(() => extractSupported(data)).toThrowError("must be an object");
    });
  });

  describe("match", () => {
    test("match locale from supported", () => {
      const matched = matchLocale("pt-br", ["en", "pt-br"]);
      expect(matched).toBe("pt-br");
    });

    test("ignores case", () => {
      const matched = matchLocale("PT-BR", ["en", "pt-br"]);
      expect(matched).toBe("pt-br");
    });

    test("partial matches", () => {
      const matched = matchLocale("PT", ["en", "pt-br"]);
      expect(matched).toBe("pt-br");
    });

    test("returns the first supported if none is passed", () => {
      const matched = matchLocale(null, ["en", "pt-br"]);
      expect(matched).toBe("en");
    });

    test("returns the first supported if none is found", () => {
      const matched = matchLocale("es", ["en", "pt-br"]);
      expect(matched).toBe("en");
    });
  });
});
