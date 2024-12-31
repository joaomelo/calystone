import type { ArtifactData } from "@/domain/artifact";
import type { NodeDataAndKind } from "@/domain/factory";
import type { Id } from "@/domain/ids";

export interface NodesRepository {
  openDirectory(id: Id): Promise<NodeDataAndKind[]>;
  fetchArtifact(id: Id): Promise<ArtifactData>;
  clearAndfetchRoot(): NodeDataAndKind;
  postArtifact(id: Id, content: ArrayBuffer): Promise<void>;
}