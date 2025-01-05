import { Exception } from "./exception";
import { Severity } from "./severities";

export function throwEmergency(code: string, cause: unknown): never {
  throwException(code, cause, Severity.Emergency);
}

export function throwAlert(code: string, cause: unknown): never {
  throwException(code, cause, Severity.Alert);
}

export function throwCritical(code: string, cause: unknown): never {
  throwException(code, cause, Severity.Critical);
}

export function throwError(code: string, cause: unknown): never {
  throwException(code, cause, Severity.Error);
}

export function throwWarning(code: string, cause: unknown): never {
  throwException(code, cause, Severity.Warning);
}

export function throwNotice(code: string, cause: unknown): never {
  throwException(code, cause, Severity.Notice);
}

export function throwInfo(code: string, cause: unknown): never {
  throwException(code, cause, Severity.Info);
}

export function throwDebug(code: string, cause: unknown): never {
  throwException(code, cause, Severity.Debug);
}

function throwException(code: string, cause: unknown, severity?: Severity): never {
  const exception = new Exception(code, cause, severity);
  throw exception;
}
