import { useMediaQuery } from "@joaomelo/media-query";

const SCREEN_SIZE_TOKENS = {
  LG: "--screen-lg",
  MD: "--screen-md",
  SM: "--screen-sm",
  XG: "--screen-xg",
};

function computedValue(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

export function useIsAtLeastSM() {
  return useMediaQuery(`(min-width: ${computedValue(SCREEN_SIZE_TOKENS.SM)})`);
}

export function useIsAtLeastMD() {
  return useMediaQuery(`(min-width: ${computedValue(SCREEN_SIZE_TOKENS.MD)})`);
}

export function useIsAtLeastLG() {
  return useMediaQuery(`(min-width: ${computedValue(SCREEN_SIZE_TOKENS.LG)})`);
}

export function useIsAtLeastXG() {
  return useMediaQuery(`(min-width: ${computedValue(SCREEN_SIZE_TOKENS.XG)})`);
}
