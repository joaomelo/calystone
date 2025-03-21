// adapted from https://datatracker.ietf.org/doc/html/rfc5424#section-6.1
export enum Severity {
  Emergency = 0, // system is unusable
  Alert, // action must be taken immediately
  Critical, // critical conditions like hard device errors or exceptions from code implementation that should never happen
  Error, // error conditions
  Warning, // warning conditions like deprecation warnings or validation errors from user input
  Notice, // normal but significant condition
  Info, // informational messages
  Debug, // debug-level messages
}

export function severest(severities: Severity[]): Severity {
  return severities.reduce((acc, current) => Math.min(acc, current), Severity.Debug);
}