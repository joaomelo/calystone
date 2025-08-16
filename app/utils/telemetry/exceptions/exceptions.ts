import { severest } from "../severities";
import { Exception } from "./exception";

export class Exceptions extends Exception {
  readonly list: Exception[] = [];
  constructor({
    cause,
    exceptions
  }: {
    cause?: unknown;
    exceptions: Exception[],
  }) {
    const severity = severest(exceptions.map((exception) => exception.severity));
    super({
      cause,
      message: "exceptions",
      severity
    });
    this.list = exceptions;
    Error.captureStackTrace(this, Exceptions);
  }
}