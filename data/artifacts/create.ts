import { type Handle } from "@data/handles";
import { createId } from "@lib";

import { type Artifact } from "./artifact";

export function createArtifact(handle: Handle, parentId?: string): Artifact {
  const id = createId();
  return { handle, id, parentId };
}

export function createArtifacts(handles: Handle[], parentId?: string): Artifact[];
export function createArtifacts(promiseOfHandles: Promise<Handle[]>, parentId?: string): Promise<Artifact[]>;
export function createArtifacts(handlesOrPromise: Handle[] | Promise<Handle[]>, parentId?: string): Artifact[] | Promise<Artifact[]> {
  if (handlesOrPromise instanceof Promise) {
    return handlesOrPromise.then(handles => createArtifacts(handles, parentId));
  }
  return handlesOrPromise.map(handle => createArtifact(handle, parentId));
}
