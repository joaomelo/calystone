import { messages } from "./messages";

export function translate(locale, key, values) {
  const localeMessages = messages[locale];
  const baseMessage = localeMessages[key];
  if (!baseMessage) return key;
  if (!values) return baseMessage;

  const replaced = Object.entries(values).reduce((acc, [key, value]) => {
    const token = `{${key}}`;
    return acc.replaceAll(token, value);
  }, baseMessage);
  return replaced;
}
