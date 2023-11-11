import { describe, test, expect } from "vitest";
import { normalizeMessages } from "./messages";

describe("messages", () => {
  const pageAuth = {
    en: {
      signIn: "sign in",
      signOut: "sign out {name}",
    },
    pt: {
      signIn: "entrar",
      signOut: "entrar",
    },
  };
  const entry = {
    en: {
      unloaded: "please wait while we load your data",
    },
    pt: {
      unloaded: "por favor, aguarde enquanto carregamos seus dados",
    },
  };

  test("normalizes messages", () => {
    const messages = normalizeMessages({ pageAuth, entry });
    expect(messages.en["pageAuth.signIn"]).toBe(pageAuth.en.signIn);
    expect(messages.pt["entry.unloaded"]).toBe(entry.pt.unloaded);
  });
});
