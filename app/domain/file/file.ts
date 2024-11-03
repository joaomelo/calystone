import type { Artifact } from "@/domain/artifact";

export interface File extends Artifact {
  fetch: Fetch;
  kind: "file";
}

export type Fetch = () => Promise<Blob>;
