import { Exception } from "./exception";
import { Severity } from "./severities";

export function throwAlert(code: string, cause: unknown): never {
  throwException(code, cause, Severity.Alert);
}

export function throwCritical(code: string, cause: unknown): never {
  throwException(code, cause, Severity.Critical);
}

export function throwDebug(code: string, cause: unknown): never {
  throwException(code, cause, Severity.Debug);
}

export function throwEmergency(code: string, cause: unknown): never {
  throwException(code, cause, Severity.Emergency);
}

export function throwError(code: string, cause: unknown): never {
  throwException(code, cause, Severity.Error);
}

export function throwInfo(code: string, cause: unknown): never {
  throwException(code, cause, Severity.Info);
}

export function throwNotice(code: string, cause: unknown): never {
  throwException(code, cause, Severity.Notice);
}

export function throwWarning(code: string, cause: unknown): never {
  throwException(code, cause, Severity.Warning);
}

function throwException(code: string, cause: unknown, severity?: Severity): never {
  const exception = new Exception(code, cause, severity);
  throw exception;
}
