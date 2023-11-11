import { describe, test, expect } from "vitest";
import { I18n } from "./i18n";

describe("i18n", () => {
  const messages = {
    en: {
      "sign-in": "sign in",
      "sign-out": "sign out {name}",
    },
    "pt-br": {
      "sign-in": "entrar",
      "sign-out": "sair {name}",
    },
  };

  test("starts with provided locale and messages", () => {
    const i18n = new I18n({ locale: "pt-BR", messages });
    expect(i18n.locale).toBe("pt-br");
    expect(i18n.messages).toEqual(messages);
  });

  test("starts with default locale if none is passed", () => {
    const i18n = new I18n({ messages });
    expect(i18n.locale).toBe("en");
  });

  test("supports locale update", () => {
    const i18n = new I18n({ messages });
    i18n.updateLocale("pt");
    expect(i18n.locale).toBe("pt-br");
  });

  test("translates with current locale", () => {
    const i18n = new I18n({ messages });
    const message = i18n.t("sign-out", { name: "jane" });
    expect(message).toBe("sign out jane");
  });
});
