import { beforeEach, describe, expect, it, vi } from "vitest";

import { Tracker } from "./tracker";

describe("Tracker", () => {
  let tracker: Tracker;
  let performanceNowSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    tracker = new Tracker("test");
    performanceNowSpy = vi.spyOn(performance, "now").mockImplementation(() => 0);
  });

  it("should initialize with empty data", () => {
    expect(tracker.amount()).toBe(0);
    expect(tracker.time()).toBe(0);
    expect(tracker.avg()).toBe(0);
  });

  it("should record timing data correctly", () => {
    performanceNowSpy.mockImplementationOnce(() => 1000);
    const stop = tracker.record();

    performanceNowSpy.mockImplementationOnce(() => 2000);
    stop();

    expect(tracker.amount()).toBe(1);
    expect(tracker.time()).toBe(1000);
    expect(tracker.avg()).toBe(1000);
  });

  it("should calculate average correctly with multiple iterations", () => {
    performanceNowSpy.mockImplementationOnce(() => 1000);
    const stop1 = tracker.record();
    performanceNowSpy.mockImplementationOnce(() => 2000);
    stop1();

    performanceNowSpy.mockImplementationOnce(() => 3000);
    const stop2 = tracker.record();
    performanceNowSpy.mockImplementationOnce(() => 4000);
    stop2();

    expect(tracker.amount()).toBe(2);
    expect(tracker.time()).toBe(2000);
    expect(tracker.avg()).toBe(1000);
  });

  it("should handle amount parameter correctly", () => {
    performanceNowSpy.mockImplementationOnce(() => 1000);
    const stop = tracker.record();

    performanceNowSpy.mockImplementationOnce(() => 2000);
    stop(5);

    expect(tracker.amount()).toBe(5);
    expect(tracker.time()).toBe(1000);
    expect(tracker.avg()).toBe(200);
  });

  it("should reset data correctly", () => {
    performanceNowSpy.mockImplementationOnce(() => 1000);
    const stop = tracker.record();
    performanceNowSpy.mockImplementationOnce(() => 2000);
    stop();

    expect(tracker.amount()).toBe(1);

    tracker.reset();
    expect(tracker.amount()).toBe(0);
    expect(tracker.time()).toBe(0);
    expect(tracker.avg()).toBe(0);
  });

  it("should generate correct summary string", () => {
    performanceNowSpy.mockImplementationOnce(() => 1000);
    const stop = tracker.record();
    performanceNowSpy.mockImplementationOnce(() => 2000);
    stop();

    expect(tracker.summary()).toBe("test: avg=1000.00ms, total=1000.00ms, amount=1.00");
  });
});
