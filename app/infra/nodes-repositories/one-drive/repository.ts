import type { ArtifactData, Id, NodeDataAndKind } from "@/domain";
import type { DriveItem } from "@microsoft/microsoft-graph-types";

import { createId } from "@/domain";
import { Client } from "@microsoft/microsoft-graph-client";

import { NodesRepositoryBase } from "../repository";

export class OneDriveNodesRepository extends NodesRepositoryBase<undefined> {
  graphClient: Client;

  constructor(accessToken: string) {
    const rootData: NodeDataAndKind = {
      id: createId(),
      kind: "directory",
      name: "OneDrive",
      parentId: undefined
    };
    super(rootData, undefined);

    this.graphClient = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });
  }

  async fetchArtifact(id: Id): Promise<ArtifactData> {
    const handle = this.nodesMetadata.fileHandleOrThrow(id);
    const file: File = await handle.getFile();
    const content: ArrayBuffer = await file.arrayBuffer();
    return {
      content,
      lastModified: file.lastModified,
      size: file.size,
    };
  }

  async openDirectory(id: Id): Promise<NodeDataAndKind[]> {
    const response = await this.graphClient
      .api(`/me/drive/items/${id}/children`)
      .get<{ value: DriveItem[] }>();
    const { value } = response;

    return value.map((item) => {
      const kind: Kind = item.folder ? "directory" : "artifact";

      return {
        id: item.id,
        kind,
        name: item.name,
        parentId: item.parentReference?.id as Id,
      };
    });

    return {
      id: item.id as Id,
      kind,
      name: item.name,
      parentId: item.parentReference?.id as Id,
    };

    return response.value;

  }

  async postArtifact(id: Id, content: ArrayBuffer): Promise<void> {
    const handle = this.nodesMetadata.fileHandleOrThrow(id);
    const writableStream = await handle.createWritable();
    await writableStream.write(content);
    await writableStream.close();
  }

}
