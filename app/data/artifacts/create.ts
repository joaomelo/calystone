import { type Artifact } from "@domain";
import { createId, type Handle, type Id } from "@lib";

export function createArtifact(handle: Handle, parentId?: Id): Artifact {
  const id = createId();
  return { handle, id, parentId };
}

export function createArtifacts(handles: Handle[], parentId?: Id): Artifact[] {
  return handles.map(handle => createArtifact(handle, parentId));
}
