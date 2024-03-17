export function d({ date, locale, options }) {
  return new Intl.DateTimeFormat(locale, options).format(date);
}
