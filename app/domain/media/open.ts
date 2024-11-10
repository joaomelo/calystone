import type { SourceResources } from "@/domain/source";

import type { Media } from "./media";

export function openMedia<Resources extends SourceResources>(resources: Resources): Media<Resources> {
  return {
    resources: resources,
    status: "idle"
  };
};