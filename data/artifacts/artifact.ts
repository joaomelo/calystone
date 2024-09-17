import { type Handle } from "@data/handles";

export interface Artifact {
  handle: Handle,
  id: string,
  parentId?: string,
};