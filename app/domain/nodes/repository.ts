import type { ArtifactData } from "@/domain/artifact";
import type { NodeDataAndKind } from "@/domain/factory";
import type { Id } from "@/domain/id";

export interface NodesRepository {
  rootData: NodeDataAndKind;
  reset(): void;
  openDirectory(id: Id): Promise<NodeDataAndKind[]>;
  fetchArtifact(id: Id): Promise<ArtifactData>;
  postArtifact(id: Id, content: ArrayBuffer): Promise<void>;
}