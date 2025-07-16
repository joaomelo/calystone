import { Exception } from "../exceptions";
import { Severity } from "../severities";

export function throwAlert(message: string, cause?: unknown): never {
  throwException(message, cause, Severity.Alert);
}

export function throwCritical(message: string, cause?: unknown): never {
  throwException(message, cause, Severity.Critical);
}

export function throwDebug(message: string, cause?: unknown): never {
  throwException(message, cause, Severity.Debug);
}

export function throwEmergency(message: string, cause?: unknown): never {
  throwException(message, cause, Severity.Emergency);
}

export function throwError(message: string, cause?: unknown): never {
  throwException(message, cause, Severity.Error);
}

export function throwInfo(message: string, cause?: unknown): never {
  throwException(message, cause, Severity.Info);
}

export function throwNotice(message: string, cause?: unknown): never {
  throwException(message, cause, Severity.Notice);
}

export function throwWarning(message: string, cause?: unknown): never {
  throwException(message, cause, Severity.Warning);
}

function throwException(message: string, cause?: unknown, severity?: Severity): never {
  throw new Exception({
    cause,
    message,
    severity
  });
}
