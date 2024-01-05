import { describe, expect, test } from "vitest";
import { translate } from "./translate";

describe("translate", () => {
  const messages = {
    "en": {
      "sign-in": "sign in",
      "sign-out": "sign out {name}",
    },
    "pt-br": {
      "sign-in": "entrar",
      "sign-out": "sair {name}",
    },
  };

  test("translates to the correct locale", () => {
    const message = translate({ key: "sign-in", locale: "en", messages });
    expect(message).toBe("sign in");
  });

  test("replaces values", () => {
    const message = translate({
      key: "sign-out",
      values: { name: "joe" },
      locale: "pt-br",
      messages,
    });
    expect(message).toBe("sair joe");
  });

  test("returns key if message is not found", () => {
    const message = translate({ key: "sign-up", locale: "en", messages });
    expect(message).toBe("sign-up");
  });
});
