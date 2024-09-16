import { type Handle } from "./handle";

export interface Entry {
  handle: Handle,
  id: string,
  parentId?: string,
};
