import type { Artifact } from "@/domain";

export interface ExchangeArtifactService {
  fetchInto(artifact: Artifact): Promise<void>
  postFrom(artifact: Artifact): Promise<void>
}
