import type { ArtifactData } from "@/domain/nodes/artifact";
import type { DirectoryData } from "@/domain/nodes/directory";
import type { Id } from "@/domain/nodes/ids";
import type { Ignore } from "@/domain/nodes/ignore";

export interface NodesRepository {
  fetchArtifactContent(id: Id): Promise<ArrayBuffer>;
  loadNodesData(ignore: Ignore): AsyncGenerator<LoadNodeData>;
  postArtifactContent(id: Id, content: ArrayBuffer): Promise<void>;
}

export type LoadNodeData = ArtifactData | DirectoryData;