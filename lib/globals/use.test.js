import { describe, expect, test } from "vitest";
import { createApp } from "vue";

import { Globals } from "./globals";
import { useGlobals, useInject } from "./use";

describe("use", () => {
  const dependencies = { a: "a", b: { b1: "b1", b2: "b2" } };

  test("use globals enables access inside component", () => {
    const globals = new Globals(dependencies);

    const result = withSetup(useGlobals);
    result.app.use(globals);
    result.app.mount(document.createElement("div"));

    expect(result.computation.inject()).toEqual(dependencies);
  });

  test("use injects enables access inside component", () => {
    const globals = new Globals(dependencies);

    const result = withSetup(useInject);
    result.app.use(globals);
    result.app.mount(document.createElement("div"));

    expect(result.computation).toEqual(dependencies);
  });
});

function withSetup(composable) {
  const result = {};
  result.app = createApp({
    setup() {
      result.computation = composable();
      return () => {};
    },
  });
  return result;
}
