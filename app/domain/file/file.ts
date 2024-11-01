import type { Artifact } from "@/domain/artifact";

export interface File extends Artifact {
  fetch: Fetch;
}

export type Fetch = () => Promise<Blob>;
