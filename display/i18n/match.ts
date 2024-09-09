
export function attemptLocaleMatch(maybeLocale: string, supported: string[]) {
  if (!maybeLocale) return null;

  const lowered = maybeLocale.toLowerCase();
  let newLocale = null;
  for (const attempt of supported) {
    if (lowered.includes(attempt) || attempt.includes(lowered)) {
      newLocale = attempt;
    }
    if (lowered === attempt) break;
  }

  return newLocale;
}