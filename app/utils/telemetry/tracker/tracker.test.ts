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
    expect(tracker.iterations()).toBe(0);
    expect(tracker.total()).toBe(0);
    expect(tracker.avg()).toBe(0);
  });

  it("should record timing data correctly", () => {
    performanceNowSpy.mockImplementationOnce(() => 1000);
    const stop = tracker.record();

    performanceNowSpy.mockImplementationOnce(() => 2000);
    stop();

    expect(tracker.iterations()).toBe(1);
    expect(tracker.total()).toBe(1);
    expect(tracker.avg()).toBe(1);
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

    expect(tracker.iterations()).toBe(2);
    expect(tracker.total()).toBe(2);
    expect(tracker.avg()).toBe(1);
  });

  it("should reset data correctly", () => {
    performanceNowSpy.mockImplementationOnce(() => 1000);
    const stop = tracker.record();
    performanceNowSpy.mockImplementationOnce(() => 2000);
    stop();

    expect(tracker.iterations()).toBe(1);

    tracker.reset();
    expect(tracker.iterations()).toBe(0);
    expect(tracker.total()).toBe(0);
    expect(tracker.avg()).toBe(0);
  });

  it("should generate correct summary string", () => {
    performanceNowSpy.mockImplementationOnce(() => 1000);
    const stop = tracker.record();
    performanceNowSpy.mockImplementationOnce(() => 2000);
    stop();

    expect(tracker.summary()).toBe("test: avg=1s, total=1s, iterations=1");
  });
});
