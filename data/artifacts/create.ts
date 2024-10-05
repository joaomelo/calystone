import { type Artifact, type Handle } from "@domain";
import { createId } from "@lib";

export function createArtifact(handle: Handle, parentId?: string): Artifact {
  const id = createId();
  return { handle, id, parentId };
}

export function createArtifacts(handles: Handle[], parentId?: string): Artifact[];
export function createArtifacts(handles: Promise<Handle[]>, parentId?: string): Promise<Artifact[]>;
export function createArtifacts(handles: PromiseOr<Handle[]>, parentId?: string): PromiseOr<Artifact[]> {
  if (handles instanceof Promise) {
    return handles.then(handles => createArtifacts(handles, parentId));
  }
  return handles.map(handle => createArtifact(handle, parentId));
}

type PromiseOr<T> = Promise<T> | T;
