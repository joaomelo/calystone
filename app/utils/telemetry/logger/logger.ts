import { Severity } from "../severities";

interface Stringable {toString(): string;}

export class Logger {
  level: Severity;

  constructor(level?: Severity) {
    this.level = level ?? Severity.Error;
  }

  alert(message: Stringable) {
    this.log(message, Severity.Alert);
  }

  critical(message: Stringable) {
    this.log(message, Severity.Critical);
  }

  debug(message: Stringable) {
    this.log(message, Severity.Debug);
  }

  emergency(message: Stringable) {
    this.log(message, Severity.Emergency);
  }

  error(message: Stringable) {
    this.log(message, Severity.Error);
  }

  info(message: Stringable) {
    this.log(message, Severity.Info);
  }

  log(message: Stringable, severity: Severity = Severity.Debug) {
    if (severity > this.level) return;
    console.info(message);
  }

  notice(message: Stringable) {
    this.log(message, Severity.Notice);
  }

  warning(message: Stringable) {
    this.log(message, Severity.Warning);
  }
}