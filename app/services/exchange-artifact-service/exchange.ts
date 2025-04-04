import type { Artifact } from "@/domain";

export interface ExchangeArtifactService {
  fetch(artifact: Artifact): Promise<ArrayBuffer>
  post(options: { artifact: Artifact; content: ArrayBuffer }): Promise<void>
}
