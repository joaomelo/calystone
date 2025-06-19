import { throwCritical } from "@/utils/telemetry/throwers";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Severity } from "../severities";
import { LoggerContainer } from "./container";
import { Logger } from "./logger";

vi.mock("@/utils/telemetry/throwers", () => ({
  throwCritical: vi.fn(),
}));

describe("LoggerContainer", () => {
  beforeEach(() => {
    LoggerContainer.instance = undefined;
    vi.clearAllMocks();
  });

  describe("create", () => {
    it("should create logger instance with default Error level", () => {
      const logger = LoggerContainer.create();
      expect(logger).toBeInstanceOf(Logger);
      expect(logger.level).toBe(Severity.Error);
      expect(LoggerContainer.instance).toBe(logger);
    });

    it("should create logger instance with custom level", () => {
      const logger = LoggerContainer.create(Severity.Warning);
      expect(logger).toBeInstanceOf(Logger);
      expect(logger.level).toBe(Severity.Warning);
      expect(LoggerContainer.instance).toBe(logger);
    });

    it("should return the same instance when called multiple times", () => {
      const logger1 = LoggerContainer.create(Severity.Debug);
      const logger2 = LoggerContainer.create(Severity.Warning);

      expect(logger1).toBe(logger2);
      expect(LoggerContainer.instance).toBe(logger1);
      expect(LoggerContainer.instance).toBe(logger2);
    });

    it("should update the instance when create is called again", () => {
      const logger1 = LoggerContainer.create(Severity.Debug);
      const logger2 = LoggerContainer.create(Severity.Warning);

      expect(logger1).toBe(logger2);
      expect(logger2.level).toBe(Severity.Warning);
    });
  });

  describe("use", () => {
    it("should return existing logger instance when initialized", () => {
      const createdLogger = LoggerContainer.create(Severity.Debug);
      const usedLogger = LoggerContainer.use();

      expect(usedLogger).toBe(createdLogger);
      expect(usedLogger).toBeInstanceOf(Logger);
    });

    it("should throw critical error when logger is not initialized", () => {
      expect(() => LoggerContainer.use()).toThrow();
      expect(throwCritical).toHaveBeenCalledWith("LOGGER_NOT_INITIALIZED");
    });

    it("should return the same instance on multiple use calls", () => {
      const logger = LoggerContainer.create(Severity.Info);
      const used1 = LoggerContainer.use();
      const used2 = LoggerContainer.use();

      expect(used1).toBe(used2);
      expect(used1).toBe(logger);
    });

    it("should maintain single instance across create and use calls", () => {
      const created = LoggerContainer.create(Severity.Debug);
      const used = LoggerContainer.use();
      const createdAgain = LoggerContainer.create(Severity.Warning);

      expect(created).toBe(used);
      expect(used).toBe(createdAgain);
      expect(LoggerContainer.instance).toBe(created);
    });
  });
});