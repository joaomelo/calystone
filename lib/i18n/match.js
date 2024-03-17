export function match(maybeLocale, supported) {
  if (!maybeLocale) return supported[0];

  const lowered = maybeLocale.toLowerCase();
  let newLocale = null;
  for (const attempt of supported) {
    if (lowered.includes(attempt) || attempt.includes(lowered)) {
      newLocale = attempt;
    }
    if (lowered === attempt) break;
  }

  return newLocale || supported[0];
}
