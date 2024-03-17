import { describe, expect, test } from "vitest";

import { merge } from "./merge";

describe("messages", () => {
  const pageSignIn = {
    en: {
      signIn: "sign in",
      signOut: "sign out {name}",
    },
    pt: {
      signIn: "entrar",
      signOut: "entrar",
    },
  };
  const pageEntry = {
    en: {
      unloaded: "please wait while we load your data",
    },
    pt: {
      unloaded: "por favor, aguarde enquanto carregamos seus dados",
    },
  };

  test("normalizes messages", () => {
    const messages = merge({ pageEntry, pageSignIn });
    expect(messages.en["pageSignIn.signIn"]).toBe(pageSignIn.en.signIn);
    expect(messages.pt["pageEntry.unloaded"]).toBe(pageEntry.pt.unloaded);
  });
});
