import {
  beforeEach, describe, expect, it, vi
} from "vitest";

import { Severity } from "../severities";
import { Logger } from "./logger";

describe("Logger", () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, "info").mockImplementation(() => undefined);
  });

  it("should create logger with default Error level", () => {
    const logger = new Logger();
    expect(logger.level).toBe(Severity.Error);
  });

  it("should create logger with custom level", () => {
    const logger = new Logger(Severity.Warning);
    expect(logger.level).toBe(Severity.Warning);
  });

  it("should log message when severity is more important than logger level", () => {
    const logger = new Logger(Severity.Warning);
    logger.log("test message", Severity.Warning);
    expect(consoleSpy).toHaveBeenCalledWith("test message");
  });

  it("should not log message when severity is less important than logger level", () => {
    const logger = new Logger(Severity.Error);
    logger.log("test message", Severity.Notice);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("should use Debug severity as default when not specified", () => {
    const logger = new Logger(Severity.Debug);
    logger.log("test message");
    expect(consoleSpy).toHaveBeenCalledWith("test message");
  });
});
