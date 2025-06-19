import { throwCritical } from "@/utils/telemetry/throwers";

import { Severity } from "../severities";

export class Logger {
  static instance?: Logger;
  level: Severity;

  private constructor(level?: Severity) {
    this.level = level ?? Severity.Error;
  }

  static create(level?: Severity) {
    Logger.instance = new Logger(level);
    return Logger.instance;
  }

  static use() {
    if (!Logger.instance) {
      throwCritical("LOGGER_NOT_INITIALIZED");
    }
    return Logger.instance;
  }

  log(message: string, severity: Severity = Severity.Debug) {
    if (severity > this.level) return;
    console.info(message);
  }
}