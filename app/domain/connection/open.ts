import type { SourceResources } from "@/domain/source";

import type { Connection } from "./connection";

export function openConnection<Resources extends SourceResources>(resources: Resources): Connection<Resources> {
  return {
    resources: resources,
    status: "idle"
  };
};