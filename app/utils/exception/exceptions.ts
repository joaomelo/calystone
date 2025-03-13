import { Exception } from "./exception";
import { severest } from "./severities";

export class Exceptions extends Exception {
  readonly list: Exception[] = [];
  constructor({ cause, exceptions }: { cause?: unknown; exceptions: Exception[], }) {
    const severity = severest(exceptions.map((exception) => exception.severity));
    super({ cause, message: "exceptions", severity });
    Error.captureStackTrace(this, Exceptions);
  }
}