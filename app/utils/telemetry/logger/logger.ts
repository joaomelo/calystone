import { Severity } from "../severities";

export class Logger {
  static instance?: Logger;
  level: Severity;

  constructor(level?: Severity) {
    this.level = level ?? Severity.Error;
  }

  log(message: string, severity: Severity = Severity.Debug) {
    if (severity > this.level) return;
    console.info(message);
  }
}