export const SCREEN_SIZE = {
  SM: "--screen-sm",
  MD: "--screen-md",
  LG: "--screen-lg",
  XG: "--screen-xg",
};

export function screenSmallValue() {
  return screenSizeValue(SCREEN_SIZE.LG);
}

export function screenMediumValue() {
  return screenSizeValue(SCREEN_SIZE.LG);
}

export function screenLargeValue() {
  return screenSizeValue(SCREEN_SIZE.LG);
}

export function screenExtraValue() {
  return screenSizeValue(SCREEN_SIZE.LG);
}

function screenSizeValue(name) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(
    name
  );
  return value;
}
