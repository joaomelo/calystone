import { describe, expect, it } from "vitest";

import { Prioritizer } from "./prioritizer";

describe("prioritizer", () => {
  it("has 0 priority if no criteria is passed", () => {
    const prioritizer = new Prioritizer();
    expect(prioritizer.priority()).toBe(0);
  });
});
