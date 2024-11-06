import type { Artifact } from "@/domain/artifact";

export interface File extends Artifact {
  fetch: Fetch;
  kind: "file";
  lastModified: number;
  mime: string;
  size: number;
}

export type Fetch = () => Promise<ArrayBuffer>;
