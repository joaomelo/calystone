export function extractSupported(messages) {
  if (
    typeof messages !== "object"
    || messages === null
    || Array.isArray(messages)
  ) {
    throw new Error(
      "messages must be an object with locales as first-level keys",
    );
  }
  return Object.keys(messages);
}

export function matchLocale(maybeLocale, supported) {
  if (!maybeLocale) return supported[0];

  const lowered = maybeLocale.toLowerCase();
  let newLocale = null;
  for (const locale of supported) {
    if (lowered.includes(locale) || locale.includes(lowered)) {
      newLocale = locale;
    }
  }
  if (!newLocale) return supported[0];
  return newLocale;
}
