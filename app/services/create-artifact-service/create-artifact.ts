import type { Directory } from "@/domain";

export interface CreateArtifactService {
  create(options: { name: string, parent: Directory }): Promise<void>
}
