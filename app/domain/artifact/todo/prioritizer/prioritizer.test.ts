import {
  describe,
  expect,
  it
} from "vitest";

import { Criterion } from "./criterion";
import { Prioritizer } from "./prioritizer";

describe("prioritizer", () => {
  it("has 0 priority if no criteria is passed", () => {
    const prioritizer = new Prioritizer();
    expect(prioritizer.priority).toBe(0);
  });

  it("priority is an average of criteria", () => {
    const prioritizer = new Prioritizer([
      new Criterion({
        label: "importance",
        value: Criterion.asValue(0.5)
      }),
      new Criterion({
        label: "urgency",
        value: Criterion.asValue(0.75)
      })
    ]);
    expect(prioritizer.priority).toBe(0.625);
  });

  it("allows add criterion", () => {
    const prioritizer = new Prioritizer();
    prioritizer.update(new Criterion({
      label: "importance",
      value: Criterion.asValue(0.5)
    }));
    expect(prioritizer.priority).toBe(0.5);
  });

  it("allows update criterion", () => {
    const prioritizer = new Prioritizer([
      new Criterion({
        label: "importance",
        value: Criterion.asValue(1)
      })
    ]);
    prioritizer.update(new Criterion({
      label: "importance",
      value: Criterion.asValue(0.5)
    }));
    expect(prioritizer.priority).toBe(0.5);
    expect(prioritizer.size).toBe(1);
  });

  it("allows remove criterion", () => {
    const prioritizer = new Prioritizer([
      new Criterion({
        label: "importance",
        value: Criterion.asValue(1)
      })
    ]);
    prioritizer.remove("importance");
    expect(prioritizer.priority).toBe(0);
    expect(prioritizer.size).toBe(0);
  });
});
