import { type Handle, type Id } from "@lib";

export interface Artifact {
  handle: Handle,
  id: Id,
  parentId?: Id,
};