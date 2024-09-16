import { createId } from "@lib";

import { type Entry } from "./entry";
import { type Handle } from "./handle";

export function createEntryFrom(handle: Handle, parentId?: string): Entry {
  const id = createId();
  return { handle, id, parentId };
}

export function createEntriesFrom(handles: Handle[], parentId?: string): Entry[] {
  return handles.map(handle => createEntryFrom(handle, parentId));
}
