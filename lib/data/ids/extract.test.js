import { describe, expect, it } from "vitest";
import { createId } from "./create";
import { isId } from "./predicates";
import { extractId, extractIds } from "./extract";

describe("extract id", () => {
  it("extract id from string", () => {
    const id = extractId(createId());
    expect(isId(id)).toBeTruthy();
  });

  it("extract id from object", () => {
    const withId = { id: createId() };
    expect(isId(extractId(withId))).toBeTruthy();
  });

  it("extract ids from a array of string or object of ids", () => {
    const id = createId();
    const withId = { id: createId() };
    const idsAndWithIds = [id, withId];

    const ids = extractIds(idsAndWithIds);

    ids.forEach(id => expect(isId(id)).toBeTruthy());
  });
});
