import { describe, expect, it } from "vitest";

import { extractId, extractIds } from "./extract";
import { createId } from "./id";

describe("extractId", () => {
  it("should return the Id if passed an Id", () => {
    const id = createId();
    expect(extractId(id)).toBe(id);
  });

  it("should return the id property if passed an object with id", () => {
    const withId = { id: createId() };
    expect(extractId(withId)).toBe(withId.id);
  });
});

describe("extractIds", () => {
  it("should extract an array of Ids from an array of Ids or WithIds", () => {
    const expectedIds = [createId(), createId()];
    const ids = [expectedIds[0], { id: expectedIds[1] }];
    expect(extractIds(ids)).toEqual(expectedIds);
  });
});
