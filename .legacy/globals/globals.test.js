import { describe, expect, test } from "vitest";

import { Globals } from "./globals";

describe("globals", () => {
  test("provide and inject are able to record a dependency", () => {
    const globals = new Globals();
    globals.provide("key", "value");
    expect(globals.inject("key")).toBe("value");
  });

  test("provide and inject can also record multiple dependencies at single operation", () => {
    const dependencies = { a: "a", b: { b1: "b1", b2: "b2" } };
    const globals = new Globals(dependencies);
    globals.provide(dependencies);
    expect(globals.inject()).toEqual(dependencies);
  });

  test("dependencies can be cleared", () => {
    const globals = new Globals("key", "value");
    globals.clear();
    expect(globals.inject("key")).toBeUndefined();
  });
});
