import { describe, expect, it } from "vitest";

import { Dater } from "./dater";

describe("dater", () => {
  it("should set start and due to day extremes if created with allDay true", () => {
    const dater = new Dater({ allDay: true });
    expect(dater.start.getHours()).toBe(0);
    expect(dater.start.getMinutes()).toBe(0);
    expect(dater.due.getHours()).toBe(23);
    expect(dater.due.getMinutes()).toBe(59);
  });

  it("should use the same date for due if start is not passed", () => {
    const dater = new Dater({ allDay: true, start: new Date(2025, 0, 1) });

    expect(dater.start.getFullYear()).toBe(2025);
    expect(dater.start.getMonth()).toBe(0);
    expect(dater.start.getDate()).toBe(1);
    expect(dater.start.getHours()).toBe(0);
    expect(dater.start.getMinutes()).toBe(0);

    expect(dater.due.getFullYear()).toBe(2025);
    expect(dater.due.getMonth()).toBe(0);
    expect(dater.due.getDate()).toBe(1);
    expect(dater.due.getHours()).toBe(23);
    expect(dater.due.getMinutes()).toBe(59);
  });

  it("should use the same date for start if due is not passed", () => {
    const dater = new Dater({ allDay: true, due: new Date(2025, 0, 1) });

    expect(dater.start.getFullYear()).toBe(2025);
    expect(dater.start.getMonth()).toBe(0);
    expect(dater.start.getDate()).toBe(1);
    expect(dater.start.getHours()).toBe(0);
    expect(dater.start.getMinutes()).toBe(0);

    expect(dater.due.getFullYear()).toBe(2025);
    expect(dater.due.getMonth()).toBe(0);
    expect(dater.due.getDate()).toBe(1);
    expect(dater.due.getHours()).toBe(23);
    expect(dater.due.getMinutes()).toBe(59);
  });

});
