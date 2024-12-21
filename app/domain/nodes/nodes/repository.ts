import type { ArtifactData } from "@/domain/nodes/artifact";
import type { DirectoryData } from "@/domain/nodes/directory";
import type { Id } from "@/domain/nodes/ids";
import type { Matcher } from "@/domain/nodes/ignore";

export interface NodesRepository {
  fetchArtifactContent(id: Id): Promise<ArrayBuffer>;
  loadNodesData(ignore: Matcher): AsyncGenerator<LoadNodeData>;
  postArtifactContent(id: Id, content: ArrayBuffer): Promise<void>;
}

export type LoadNodeData = ArtifactData | DirectoryData;