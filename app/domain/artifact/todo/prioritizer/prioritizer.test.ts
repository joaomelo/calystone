import {
  describe, expect, it
} from "vitest";

import { asCriterionValue } from "./criteria";
import { Prioritizer } from "./prioritizer";

describe("prioritizer", () => {
  it("has 0 priority if no criteria is passed", () => {
    const prioritizer = new Prioritizer();
    expect(prioritizer.priority()).toBe(0);
  });

  it("priority is an average of criteria", () => {
    const prioritizer = new Prioritizer([{
      label: "importance",
      value: asCriterionValue(0.5)
    }, {
      label: "urgency",
      value: asCriterionValue(0.75)
    }]);
    expect(prioritizer.priority()).toBe(0.625);
  });

  it("allows add criterion", () => {
    const prioritizer = new Prioritizer();
    prioritizer.update({
      label: "importance",
      value: asCriterionValue(0.5)
    });
    expect(prioritizer.priority()).toBe(0.5);
  });

  it("allows update criterion", () => {
    const prioritizer = new Prioritizer([{
      label: "importance",
      value: asCriterionValue(1)
    }]);
    prioritizer.update({
      label: "importance",
      value: asCriterionValue(0.5)
    });
    expect(prioritizer.priority()).toBe(0.5);
  });

  it("allows remove criterion", () => {
    const prioritizer = new Prioritizer([{
      label: "importance",
      value: asCriterionValue(1)
    }]);
    prioritizer.remove("importance");
    expect(prioritizer.priority()).toBe(0);
  });
});
