export const SCREEN_SIZE_TOKENS = {
  SM: "--screen-sm",
  MD: "--screen-md",
  LG: "--screen-lg",
  XG: "--screen-xg",
};

export function screenSmallValue() {
  return screenSizeValue(SCREEN_SIZE_TOKENS.SM);
}

export function screenMediumValue() {
  return screenSizeValue(SCREEN_SIZE_TOKENS.MD);
}

export function screenLargeValue() {
  return screenSizeValue(SCREEN_SIZE_TOKENS.LG);
}

export function screenExtraValue() {
  return screenSizeValue(SCREEN_SIZE_TOKENS.XG);
}

function screenSizeValue(name) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(
    name
  );
  return value;
}
