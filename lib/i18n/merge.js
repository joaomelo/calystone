export function merge(modules) {
  const messages = {};
  Object.entries(modules).forEach(([moduleName, moduleMessages]) => {
    Object.entries(moduleMessages).forEach(([locale, localeMessages]) => {
      if (!messages[locale]) messages[locale] = {};
      Object.entries(localeMessages).forEach(([key, message]) => {
        messages[locale][`${moduleName}.${key}`] = message;
      });
    });
  });
  return messages;
}
