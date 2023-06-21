export const supported = ["en", "pt-br"];

export function localize(maybeLocale) {
  const fallback = "en";
  if (!maybeLocale) return fallback;

  const lowered = maybeLocale.toLowerCase();
  for (const locale of supported) {
    if (lowered.includes(locale) || locale.includes(lowered)) {
      return locale;
    }
  }

  return fallback;
}
