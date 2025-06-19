import { throwCritical } from "@/utils/telemetry/throwers";

import type { Severity } from "../severities";

import { Logger } from "./logger";

export class LoggerContainer {
  static instance?: Logger;

  private constructor(level?: Severity) {
    LoggerContainer.instance = new Logger(level);
  }

  static create(level?: Severity) {
    LoggerContainer.instance = new Logger(level);
    return LoggerContainer.instance;
  }

  static use() {
    if (!LoggerContainer.instance) {
      throwCritical("LOGGER_NOT_INITIALIZED");
    }
    return LoggerContainer.instance;
  }
}