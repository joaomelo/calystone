export function haltExecution() {
  return new Promise<never>(() => { return; });
}