import { type Artifact } from "@/domain/artifacts";

export interface Source {
  load: () => AsyncIterableIterator<Artifact>;
}