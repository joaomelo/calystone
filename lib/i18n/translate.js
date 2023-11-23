export function translate({ key, values, locale, messages }) {
  const baseMessage = messages[locale][key];
  if (!baseMessage) return key;
  if (!values) return baseMessage;

  const replaced = Object.entries(values).reduce((acc, [key, value]) => {
    const token = `{${key}}`;
    return acc.replaceAll(token, value);
  }, baseMessage);
  return replaced;
}