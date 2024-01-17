export function dt(selector) {
  return `[data-test="${selector}"]`;
}

export function dtl(selector) {
  return `[data-test*="${selector}"]`;
}
