import type { Artifact } from "./artifact";

export function path(artifact: Artifact): string {
  return artifact.parent
    ? `${path(artifact.parent)}/${artifact.name}`
    : `/${artifact.name}`;
}
