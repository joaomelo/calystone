import { Severity } from "../severities";

export class Exception extends Error {
  readonly path: string;
  readonly severity;

  constructor({
    cause, message, path, severity
  }: {
    cause?: unknown,
    message: string,
    path?: string,
    severity?: Severity
  }) {
    super(message);
    this.path = path ?? "global";
    this.severity = severity ?? Severity.Error;
    this.cause = cause;
    Error.captureStackTrace(this, Exception);
  }
}