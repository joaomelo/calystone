import { Severity } from "../severities";

export class Logger {
  static instance?: Logger;
  level: Severity;

  constructor(level?: Severity) {
    this.level = level ?? Severity.Error;
  }

  alert(message: string) {
    this.log(message, Severity.Alert);
  }

  critical(message: string) {
    this.log(message, Severity.Critical);
  }

  debug(message: string) {
    this.log(message, Severity.Debug);
  }

  emergency(message: string) {
    this.log(message, Severity.Emergency);
  }

  error(message: string) {
    this.log(message, Severity.Error);
  }

  info(message: string) {
    this.log(message, Severity.Info);
  }

  log(message: string, severity: Severity = Severity.Debug) {
    if (severity > this.level) return;
    console.info(message);
  }

  notice(message: string) {
    this.log(message, Severity.Notice);
  }

  warning(message: string) {
    this.log(message, Severity.Warning);
  }
}