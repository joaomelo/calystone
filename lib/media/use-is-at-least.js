import { useMediaQuery } from "./use-media-query";
import {
  screenSmallValue,
  screenMediumValue,
  screenLargeValue,
  screenExtraValue,
} from "./screen-sizes";

export function useIsAtLeastSmall() {
  return useMediaQuery(`(min-width: ${screenSmallValue()})`);
}

export function useIsAtLeastMedium() {
  return useMediaQuery(`(min-width: ${screenMediumValue()})`);
}

export function useIsAtLeastLarge() {
  return useMediaQuery(`(min-width: ${screenLargeValue()})`);
}

export function useIsAtLeastExtra() {
  return useMediaQuery(`(min-width: ${screenExtraValue()})`);
}
