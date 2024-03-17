import { describe, expect, test } from "vitest";

import { t, tWith } from "./t";

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
    const message = t({ key: "sign-in", locale: "en", messages });
    expect(message).toBe("sign in");
  });

  test("interpolate values", () => {
    const message = t({
      key: "sign-out",
      locale: "pt-br",
      messages,
      values: { name: "joe" },
    });
    expect(message).toBe("sair joe");
  });

  test("helper with", () => {
    const t = tWith({ locale: "en", messages });
    const message = t("sign-out", { name: "joe" });
    expect(message).toBe("sign out joe");
  });

  test("returns key if message is not found", () => {
    const message = t({ key: "sign-up", locale: "en", messages });
    expect(message).toBe("sign-up");
  });
});
