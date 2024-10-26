import { type Artifact } from "@/domain/artifact";

export interface Source {
  load: () => AsyncIterableIterator<Artifact>;
}