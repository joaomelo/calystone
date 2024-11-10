import type { Media } from "./media";
import type { MediaResources } from "./resources";

export function openMedia<Resources extends MediaResources>(resources: Resources): Media<Resources> {
  return {
    resources: resources,
    status: "idle"
  };
};