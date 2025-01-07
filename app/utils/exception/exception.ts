import { Severity } from "./severities";

export class Exception extends Error {
  code;
  detail;
  severity;

  constructor(code: string, cause: unknown, severity?: Severity) {
    super(code);
    this.code = code;
    this.severity = severity ?? Severity.Error;
    this.detail = JSON.stringify(cause);
    this.cause = cause;
    Error.captureStackTrace(this, Exception);
  }
}