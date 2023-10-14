import { describe, test, expect } from "vitest";
import { isRoot } from "./is-root";

describe("isRoot", () => {
  test("isRoot detects root items", () => {
    expect(isRoot({ id: "test", parentId: null })).toBeTruthy();
  });
});
