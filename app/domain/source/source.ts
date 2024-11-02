import type { Artifact } from "@/domain/artifact";

export type Source = ActiveSource | ClosedSource;

export interface ActiveSource {
  load: Load;
  status: "loading" | "open";
}

export interface ClosedSource {
  // the optional presence of load allows for a transition state while the status is set to close and then the root is set to undefined
  load?: Load;
  status: "closed",
}

export type Load = () => AsyncGenerator<Artifact>;