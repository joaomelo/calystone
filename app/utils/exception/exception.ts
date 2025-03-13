import { Severity } from "./severities";

export class Exception extends Error {
  readonly code;
  readonly detail;
  readonly severity;

  constructor(code: string, cause: unknown, severity?: Severity) {
    super(code);
    this.code = code;
    this.severity = severity ?? Severity.Error;
    this.detail = typeof cause === "string" ? cause : undefined;
    this.cause = cause;
    Error.captureStackTrace(this, Exception);
  }
}