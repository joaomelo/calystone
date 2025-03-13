import { Exception } from "./exception";
import { severest } from "./severities";

export class Exceptions extends Exception {
  readonly list: Exception[] = [];
  constructor(exceptions: Exception[], cause?: unknown) {
    const severity = severest(exceptions.map((exception) => exception.severity));
    super("exceptions", cause, severity);
    Error.captureStackTrace(this, Exceptions);
  }
}