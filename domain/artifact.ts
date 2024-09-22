import { type Handle } from "./handle";

export interface Artifact {
  handle: Handle,
  id: string,
  parentId?: string,
};