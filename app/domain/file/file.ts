import type { Artifact } from "@/domain/artifact";

export interface File<MediaResources> extends Artifact {
  kind: "file";
  lastModified: number;
  media: MediaResources
  mime: string;
  size: number;
}
