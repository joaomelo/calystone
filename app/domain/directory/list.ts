import type { Artifacts } from "@/domain/artifacts";
import type { Id } from "@/utils";

import { listArtifacts } from "@/domain/artifacts";
import { extractId } from "@/utils";

import type { Directory } from "./directory";

export function listChildren(artifacts: Artifacts, directoryOrId: Directory | Id) {
  const id = extractId(directoryOrId);
  return listArtifacts(artifacts, ({ parentId }) => parentId === id);
}