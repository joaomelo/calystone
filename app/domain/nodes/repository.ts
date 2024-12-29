import type { ArtifactData } from "@/domain/artifact";
import type { Id } from "@/domain/ids";
import type { NodeDataAndKind } from "@/domain/node";

export interface NodesRepository {
  openDirectory(id?: Id): Promise<NodeDataAndKind[]>;
  fetchArtifact(id: Id): Promise<ArtifactData>;
  postArtifact(id: Id, content: ArrayBuffer): Promise<void>;
}